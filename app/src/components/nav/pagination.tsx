import Link from 'next/link';

interface PropsPagination {
  page: number;
  countPage: number;
  query?: string;
}

export default function LinkPagination({ page, countPage, query }: PropsPagination) {
  return (
    <>
      {query ? (
        <div className="flex justify-center items-center mt-6 gap-4">
          {page > 1 && (
            <Link
              href={`?query=${query}&page=${Number(page) - 1}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Anterior
            </Link>
          )}
          {page < countPage && (
            <Link
              href={`?query=${query}&page=${Number(page) + 1}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Próxima
            </Link>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-6 gap-4">
          {page > 1 && (
            <Link
              href={`?page=${Number(page) - 1}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Anterior
            </Link>
          )}
          {page < countPage && (
            <Link
              href={`?page=${Number(page) + 1}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Próxima
            </Link>
          )}
        </div>)
      }
    </>
  );
}
