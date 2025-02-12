import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'

/* eslint-disable react/no-unescaped-entities */
export default function Term() {
  return (
    <div className="container mx-auto text-white max-w-[1200px] p-4">
      <Link href="/user/insert" className="flex items-center py-8">
        <GoArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <h1 className="text-3xl font-bold mb-4">Termo de Serviço</h1>
      <p className="text-sm text-gray-500 mb-6">
        Última atualização: 30/01/2025
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Aceitação dos Termos</h2>
        <p className="mb-4">
          Ao acessar e usar a nossa rede social ("Serviço"), você concorda em
          cumprir e estar vinculado a este Termo de Serviço ("Termo"). Se você
          não concordar com alguma parte deste Termo, não poderá acessar ou usar
          o Serviço.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Uso do Serviço</h2>
        <div className="ml-4">
          <h3 className="text-xl font-semibold mb-2">
            2.1. Responsabilidade do Usuário
          </h3>
          <p className="mb-4">
            O usuário é totalmente responsável por todas as atividades que
            ocorrem em sua conta e deve garantir que todas as informações
            fornecidas sejam verdadeiras, precisas e atualizadas.
          </p>
          <p className="mb-4">
            O usuário deve proteger a confidencialidade de sua senha e outras
            credenciais de acesso.
          </p>

          <h3 className="text-xl font-semibold mb-2">
            2.2. Conformidade com a LGPD
          </h3>
          <p className="mb-4">
            Ao usar o Serviço, o usuário concorda com a coleta, uso e
            armazenamento de seus dados pessoais conforme descrito na nossa
            Política de Privacidade, em conformidade com a Lei Geral de Proteção
            de Dados (Lei nº 13.709/2018).
          </p>
          <p className="mb-4">
            O usuário tem o direito de acessar, corrigir e excluir seus dados
            pessoais, bem como de solicitar a portabilidade dos mesmos.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          3. Conteúdo Gerado pelo Usuário
        </h2>
        <div className="ml-4">
          <h3 className="text-xl font-semibold mb-2">
            3.1. Propriedade e Licença
          </h3>
          <p className="mb-4">
            O usuário mantém a propriedade de todo o conteúdo que publica no
            Serviço. No entanto, ao postar conteúdo, o usuário concede ao
            Serviço uma licença não exclusiva, irrevogável e livre de royalties
            para usar, modificar, exibir e distribuir tal conteúdo no contexto
            da operação do Serviço.
          </p>

          <h3 className="text-xl font-semibold mb-2">
            3.2. Responsabilidade pelo Conteúdo
          </h3>
          <p className="mb-4">
            O usuário é responsável por garantir que qualquer conteúdo postado
            não infrinja direitos de terceiros, incluindo direitos autorais,
            marcas registradas, privacidade, publicidade ou outros direitos
            pessoais ou de propriedade.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Conduta Proibida</h2>
        <p className="mb-4">O usuário concorda em não usar o Serviço para:</p>
        <ul className="list-disc list-inside ml-8 mb-4">
          <li>
            Publicar conteúdo ilegal, ofensivo, difamatório, ou que promova
            violência ou discriminação.
          </li>
          <li>
            Violar direitos de propriedade intelectual ou outros direitos de
            qualquer pessoa.
          </li>
          <li>
            Interferir no funcionamento do Serviço ou nos servidores e redes
            conectados ao Serviço.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Isenção de Garantias</h2>
        <p className="mb-4">
          O Serviço é fornecido "como está" e "conforme disponível". Não
          garantimos que o Serviço será ininterrupto, livre de erros ou seguro.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          6. Limitação de Responsabilidade
        </h2>
        <p className="mb-4">
          Na máxima extensão permitida por lei, o Serviço não será responsável
          por quaisquer danos indiretos, incidentais, consequenciais ou
          punitivos, ou qualquer perda de lucros ou receitas, seja direta ou
          indiretamente, ou qualquer perda de dados, uso, boa vontade, ou outras
          perdas intangíveis.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          7. Modificações no Termo
        </h2>
        <p className="mb-4">
          Podemos modificar este Termo a qualquer momento. Notificaremos os
          usuários sobre quaisquer alterações materiais, e o uso contínuo do
          Serviço após tais modificações constitui aceitação dos novos Termos.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Contato</h2>
        <p className="mb-4">
          Se você tiver alguma dúvida sobre este Termo, entre em contato conosco
          através do e-mail:{' '}
          <Link href="" className="underline text-blue-600">
            Email
          </Link>
        </p>
      </section>
    </div>
  )
}