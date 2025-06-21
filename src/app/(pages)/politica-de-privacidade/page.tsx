import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | VISTA NOVA',
  description: 'Conheça nossa política de privacidade e como protegemos seus dados pessoais.',
};

export default function PoliticaPrivacidade() {
  return (
    <article className="prose max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Política de Privacidade</h1>
      
      <p className="text-lg text-gray-700 mb-6">
        Última atualização: {new Date().toLocaleDateString('pt-PT')}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">1. Introdução</h2>
        <p className="mb-4">
          A VISTA NOVA está comprometida em proteger a privacidade dos seus utilizadores. Esta Política de Privacidade explica como recolhemos, utilizamos, divulgamos e salvaguardamos as suas informações quando visita o nosso site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">2. Informações que Recolhemos</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Informações de contato (nome, e-mail, telefone)</li>
          <li>Informações de navegação no site</li>
          <li>Dados de interação com nossos serviços</li>
          <li>Informações de dispositivo e conexão</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">3. Como Utilizamos as Suas Informações</h2>
        <p className="mb-4">
          Utilizamos as informações recolhidas para:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Fornecer e melhorar nossos serviços</li>
          <li>Responder a consultas e fornecer suporte ao cliente</li>
          <li>Enviar atualizações e comunicações de marketing</li>
          <li>Garantir a segurança e prevenir fraudes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">4. Partilha de Informações</h2>
        <p className="mb-4">
          Não vendemos nem alugamos suas informações pessoais a terceiros. Podemos partilhar informações com:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Prestadores de serviços que nos auxiliam em nossas operações</li>
          <li>Autoridades legais quando exigido por lei</li>
          <li>Empresas afiliadas para fins de negócios legítimos</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">5. Seus Direitos</h2>
        <p className="mb-4">
          De acordo com o RGPD, você tem o direito de:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Acessar suas informações pessoais</li>
          <li>Solicitar a correção de dados incorretos</li>
          <li>Solicitar a eliminação de seus dados</li>
          <li>Opor-se ao processamento de seus dados</li>
          <li>Solicitar a portabilidade de seus dados</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">6. Segurança dos Dados</h2>
        <p className="mb-4">
          Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">7. Alterações a Esta Política</h2>
        <p className="mb-4">
          Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos que reveja esta página regularmente para se manter informado sobre as alterações.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-primary mb-4">8. Contacta-nos</h2>
        <p className="mb-2">
          Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através de:
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
