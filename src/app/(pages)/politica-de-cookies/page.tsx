import Link from 'next/link';

export const metadata = {
  title: 'Política de Cookies | Vista Nova',
  description: 'Saiba como utilizamos cookies e tecnologias semelhantes no nosso site.',
};

export default function PoliticaCookies() {
  return (
    <article className="prose max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Política de Cookies</h1>
      
      <p className="text-lg text-gray-700 mb-6">
        Última atualização: {new Date().toLocaleDateString('pt-PT')}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">O que são cookies?</h2>
        <p className="mb-4">
          Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita o nosso site. Eles permitem que o site se lembre das suas ações e preferências (como login, idioma, tamanho da fonte e outras preferências de exibição) durante um período de tempo, para que não tenha de as voltar a inserir quando regressar ao site ou navegar de uma página para outra.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Como utilizamos os cookies</h2>
        <p className="mb-4">
          Utilizamos cookies para vários fins, incluindo:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Permitir funcionalidades essenciais do site</li>
          <li>Melhorar o desempenho do site</li>
          <li>Lembrar as suas preferências</li>
          <li>Fornecer anúncios direcionados</li>
          <li>Analisar o uso do site</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Tipos de cookies que utilizamos</h2>
        
        <h3 className="text-xl font-semibold text-primary mt-6 mb-2">Cookies Essenciais</h3>
        <p className="mb-4">
          Estes cookies são necessários para que o site funcione corretamente e não podem ser desativados nos nossos sistemas. Eles geralmente são configurados apenas em resposta a ações realizadas por si que equivalem a uma solicitação de serviços, como definir suas preferências de privacidade, fazer login ou preencher formulários.
        </p>
        
        <h3 className="text-xl font-semibold text-primary mt-6 mb-2">Cookies de Desempenho</h3>
        <p className="mb-4">
          Estes cookies nos permitem contar visitas e fontes de tráfego para que possamos medir e melhorar o desempenho do nosso site. Eles nos ajudam a saber quais são as páginas mais e menos populares e a ver como os visitantes se movimentam pelo site.
        </p>
        
        <h3 className="text-xl font-semibold text-primary mt-6 mb-2">Cookies de Funcionalidade</h3>
        <p className="mb-4">
          Estes cookies permitem que o site forneça funcionalidades e personalização aprimoradas. Eles podem ser definidos por nós ou por provedores de serviços terceirizados cujos serviços adicionamos às nossas páginas.
        </p>
        
        <h3 className="text-xl font-semibold text-primary mt-6 mb-2">Cookies de Publicidade</h3>
        <p className="mb-4">
          Estes cookies podem ser definidos através do nosso site pelos nossos parceiros de publicidade. Eles podem ser usados ​​por essas empresas para criar um perfil dos seus interesses e mostrar-lhe anúncios relevantes em outros sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Como gerir as suas preferências de cookies</h2>
        <p className="mb-4">
          Pode configurar o seu navegador para bloquear ou alertá-lo sobre esses cookies, mas algumas partes do site podem não funcionar corretamente. Para obter informações sobre como gerenciar as configurações de cookies em diferentes navegadores, consulte os links abaixo:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><Link href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline">Google Chrome</Link></li>
          <li><Link href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-s" className="text-primary hover:underline">Mozilla Firefox</Link></li>
          <li><Link href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" className="text-primary hover:underline">Safari</Link></li>
          <li><Link href="https://support.microsoft.com/pt-pt/microsoft-edge/gerenciar-cookies-no-microsoft-edge-6d79d55e-6d7d-44cd-9ff9-6f3da9d6fd1f" className="text-primary hover:underline">Microsoft Edge</Link></li>
          <li><Link href="https://help.opera.com/en/latest/web-preferences/#cookies" className="text-primary hover:underline">Opera</Link></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Alterações à nossa política de cookies</h2>
        <p className="mb-4">
          Podemos atualizar a nossa Política de Cookies periodicamente. Publicaremos quaisquer alterações nesta página e, se as alterações forem significativas, forneceremos um aviso mais proeminente.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-primary mb-4">Contacte-nos</h2>
        <p className="mb-4">
          Se tiver alguma dúvida sobre a nossa Política de Cookies, entre em contato conosco através de:
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>E-mail: <Link href="mailto:geral@vistanova.pt" className="text-primary hover:underline">geral@vistanova.pt</Link></li>
          <li>Telefone: <Link href="tel:+351223750602" className="text-primary hover:underline">+351 22 375 06 02</Link></li>
          <li>Endereço: Rua da Bélgica, 3434–H, 4400-209 Vila Nova de Gaia</li>
        </ul>
      </section>
    </article>
  );
}
