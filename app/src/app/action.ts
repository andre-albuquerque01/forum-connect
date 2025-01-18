'use server'

import ApiError from "@/data/api-error";
import ApiServer from "@/data/api-server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ThreadInterface } from "./threads/(home)/page";


// User
export async function RegisterUser(state: { ok: boolean; data: null; error: string }, request: FormData) {
    const schema = z.object({
        name: z.string(),
        nickname: z.string(),
        email: z.string().email(),
        termService: z.boolean(),
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres.")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial."),
        passwordConfirmation: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres."),
    }).refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "As senhas devem coincidir.",
    });

    const formData = Object.fromEntries(request.entries());
    const termService = formData.termService === 'on';

    const parsedData = {
        ...formData,
        termService,
    };

    const result = schema.safeParse(parsedData);
    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * "), data: null };
    }

    try {
        const response = await ApiServer("users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(result.data),
        });

        if (response.status === 204) {
            return { ok: true, error: "", data: null };
        }

        const data = await response.json();

        if (data.error === 'Email já em uso.') {
            return { ok: false, error: 'Email já em uso.', data: null };
        }

        throw new Error("Não foi possível registrar o usuário");
    } catch (error) {
        return ApiError(error);
    }
}

export async function UpdateUser(request: object) {
    const schema = z.object({
        name: z.string(),
        nickname: z.string(),
        email: z.string().email(),
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres.")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial."),
    })

    const result = schema.safeParse(request);
    if (!result.success) {
        return "* " + result.error.errors.map(e => e.message).join(" * ")
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')

    try {
        const response = await ApiServer("update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result.data),
        });

        if (response.status === 201) {
            return 'success'
        }

        const data = await response.json();

        if (data.error === 'Email already in use') {
            return 'Email já em uso.'
        } else if (data.error === 'Usuário não encontrado') {
            return 'Usuário não encontrado.'
        } else if (data.error === 'Senha incorreta') {
            return 'Senha incorreta'
        }

        return 'Houve erro na hora de fazer alteração.'
    } catch (error) {
        console.error(error);
        return ("Não foi possível atualizar o usuário");
    }
}

export async function ProfileUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    try {
        const response = await ApiServer('me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: 60 * 2,
                tags: ['threads'],
            }
        })

        const data = await response.json()

        if (!data) return {}

        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function LoginUser(
    state: { ok: boolean; data: null; error: string },
    request: FormData) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })

    const requestJson = Object.fromEntries(request)
    const result = authenticateBodySchema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * "), data: null };
    }

    const cookieStore = await cookies()

    try {
        const response = await ApiServer('sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })

        const { token } = await response.json()

        if (response.status !== 200) {
            return { ok: false, error: "Email ou senha inválida.", data: null };
        }

        cookieStore.set('token', token, {
            expires: Date.now() + 2 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        })

    } catch (error) {
        return ApiError(error)
    }
    redirect('/')
}

export async function SendEmailRecoverPassword(
    state: { ok: boolean; data: null; error: string },
    request: FormData) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
    })

    const requestJson = Object.fromEntries(request)
    const result = authenticateBodySchema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message), data: null };
    }

    try {
        const response = await ApiServer('recover-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json().catch(err => { return { ok: false, error: err.error, data: '' } });

        if (data.error === 'User not found') {
            return { ok: false, error: 'Email não encontrado.', data: null };
        }

        if (response.status !== 200) {
            return { ok: false, error: "Email inválido.", data: null };
        }

        return { ok: true, error: '', data: null };
    } catch (error) {
        return ApiError(error)
    }
}

export async function RecoverPasswordUpdate(state: { ok: boolean; data: null; error: string }, request: FormData) {
    const schema = z.object({
        token: z.string(),
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres.")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial."),
        passwordConfirmation: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres."),
    }).refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "As senhas devem coincidir.",
    });

    const formData = Object.fromEntries(request.entries());

    const result = schema.safeParse(formData);
    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * "), data: null };
    }

    try {
        const response = await ApiServer("recover-password-update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(result.data),
        });

        if (response.status === 200) {
            return { ok: true, error: "", data: null };
        }

        const data = await response.json();
        console.log(data);


        if (data.error === 'Token invalido') {
            return { ok: false, error: 'Token inválido.', data: null };
        }

        if (data.error === 'Usuário não encontrado') {
            return { ok: false, error: 'Usuário não encontrado.', data: null };
        }

        throw new Error("Não foi possível alterar a senha");
    } catch (error) {
        return ApiError(error);
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('token')
}


// Threads
interface FetchThreadsResponse {
    data: ThreadInterface[];
    totalPages: number;
}

export async function FetchRecentThreads(page: number): Promise<FetchThreadsResponse> {
    try {
        const response = await ApiServer(`posts/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            next: {
                revalidate: 60 * 2,
                tags: ['threads'],
            }
        })

        const data = await response.json()

        if (data === null) return { data: [], totalPages: 0 };
        return { data: data.posts, totalPages: data.totalPages }
    } catch (error) {
        console.error(error);
        return { data: [], totalPages: 0 };
    }
}

export async function FetchSearchThreads(query: string, page: number): Promise<FetchThreadsResponse> {
    try {
        const response = await ApiServer(`posts/search/${query}/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            next: {
                revalidate: 60 * 2,
                tags: ['threads'],
            }
        })
        const data = await response.json()

        if (data === null) return { data: [], totalPages: 0 };
        return { data: data.posts, totalPages: data.totalPages }

    } catch (error) {
        console.error(error);
        return { data: [], totalPages: 0 };
    }
}

export async function GetUserByThreads() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')
    try {
        const response = await ApiServer(`find-user-post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: 60 * 60,
                tags: ['threads'],
            }
        })

        const data: [] = await response.json()

        if (data === null) return []

        return data
    } catch (error) {
        return ApiError(error)
    }
}
export async function SearchUserByThreads(id: string) {
    try {
        const response = await ApiServer(`search-user-post/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            next: {
                revalidate: 60 * 60,
                tags: ['threads'],
            }
        })
        const data = await response.json()
        
        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function DeleteThread(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')

    try {
        const response = await ApiServer(`deletePost/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        revalidateTag('threads')

        if (response.status === 201) {
            return 'success'
        }

        const data = await response.json();

        if (data.error === 'Post not found') {
            return 'Questão não encontrado.'
        } else if (data.error === 'You are not authorized to update this post') {
            return 'Não é autorizado para fazer alteração.'
        }

        return 'Houve erro na hora de fazer alteração.'
    } catch (error) {
        console.error(error);
        return ("Não foi possível atualizar o usuário");
    }
}

export async function CreateThread(state: { ok: boolean; data: null; error: string }, request: FormData) {
    const schema = z.object({
        title: z.string(),
        content: z.string().min(3, 'O mínimo de caracter é de 3.').max(255, 'O máximo de caracter permitido é 255.'),
    })

    const formData = Object.fromEntries(request.entries());
    const result = schema.safeParse(formData);
    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * "), data: null };
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')

    try {
        const response = await ApiServer("createPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result.data),
        });
        revalidateTag('threads')

        if (response.status !== 204) {
            return { ok: false, error: 'Não foi possível registrar o usuário', data: null };
        }
        return { ok: true, error: '', data: null }
    } catch (error) {
        return ApiError(error);
    }
}

export async function UpdateThread(request: object) {
    const schema = z.object({
        id: z.string().uuid(),
        title: z.string().min(3, 'O mínimo de caracter é de 3.').max(100, 'O máximo de caracter permitido é de 100.'),
        content: z.string().min(3, 'O mínimo de caracter é de 3.').max(255, 'O máximo de caracter permitido é de 255.'),
    })

    const result = schema.safeParse(request);

    if (!result.success) {
        return "* " + result.error.errors.map(e => e.message).join(" * ")
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')

    try {
        const response = await ApiServer(`updatePost/${result.data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result.data),
        });
        revalidateTag('threads')
        if (response.status === 204) {
            return 'success'
        }

        const data = await response.json();

        if (data.error === 'Post not found') {
            return 'Questão não encontrado.'
        } else if (data.error === 'You are not authorized to update this post') {
            return 'Não é autorizado para fazer alteração.'
        }

        return 'Houve erro na hora de fazer alteração.'
    } catch (error) {
        console.error(error);
        return ("Não foi possível atualizar o usuário");
    }
}

export async function GetByIdThread(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')

    try {
        const response = await ApiServer(`findByIdPost/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: 60 * 60,
                tags: ['threads'],
            }
        })

        const data = await response.json()

        return data
    } catch (error) {
        return ApiError(error)
    }
}


// Comentario
export async function CreateComment(state: { ok: boolean; data: null; error: string }, request: FormData) {
    const schema = z.object({
        postId: z.string(),
        content: z.string().min(3, 'O mínimo de caracter é de 3.').max(255, 'O máximo de caracter permitido é 255.'),
    });

    const parsedData = Object.fromEntries(request.entries());

    const result = schema.safeParse(parsedData);
    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * "), data: null };
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')

    try {
        const response = await ApiServer("createComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result.data),
        });
        revalidateTag('threads')

        if (response.status === 204) {
            return { ok: true, error: "", data: null };
        }

        const data = await response.json();

        if (data.error === 'Post not found') {
            return { ok: false, error: 'Questão pode ter sido invalidada', data: null };
        }

        throw new Error("Não foi possível registrar");
    } catch (error) {
        return ApiError(error);
    }
}

export async function DeleteComment(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/user/login')

    try {
        const response = await ApiServer(`deleteComment/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        revalidateTag('threads')

        if (response.status === 201) {
            return 'success'
        }

        const data = await response.json();

        if (data.error === 'Comment not found') {
            return 'Comentário não encontrado.'
        } else if (data.error === 'You are not authorized to update this comment') {
            return 'Não é autorizado para fazer alteração.'
        }

        return 'Houve erro na hora de fazer alteração.'
    } catch (error) {
        console.error(error);
        return ("Não foi possível atualizar o usuário");
    }
}