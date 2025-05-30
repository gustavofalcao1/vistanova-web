import Link from 'next/link';

export const metadata = {
  title: 'Aviso de Privacidade | Vista Nova',
  description: 'Informações sobre como a Vista Nova protege e gerencia seus dados pessoais.',
};

export default function AvisoPrivacidade() {
  return (
    <article className="prose max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Aviso de Privacidade</h1>
      
      <p className="text-lg text-gray-700 mb-6">
        Data de entrada em vigor: {new Date().toLocaleDateString('pt-PT')}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Responsável pelo Tratamento</h2>
        <p className="mb-4">
          A Vista Nova, com sede em Rua da Bélgica, 3434–H, 4400-209 Vila Nova de Gaia, é a responsável pelo tratamento dos seus dados pessoais.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Finalidades do Tratamento</h2>
        <p className="mb-4">
          Os seus dados pessoais são recolhidos e tratados para as seguintes finalidades:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Prestação de serviços de intermediação de crédito</li>
          <li>Comunicação de informações sobre produtos e serviços</li>
          <li>Cumprimento de obrigações legais</li>
          <li>Gestão de relacionamento com o cliente</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Conservação dos Dados</h2>
        <p className="mb-4">
          Os seus dados serão conservados apenas pelo período necessário para a prossecução das finalidades que motivaram a sua recolha ou pelo prazo legal aplicável.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Direitos do Titular dos Dados</h2>
        <p className="mb-4">
          Nos termos da legislação aplicável, tem o direito de:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Acesso aos seus dados pessoais</li>
          <li>Retificação dos dados inexatos ou desatualizados</li>
          <li>Eliminação dos seus dados pessoais</li>
          <li>Limitação do tratamento dos seus dados</li>
          <li>Oposição ao tratamento dos seus dados</li>
          <li>Portabilidade dos seus dados</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Comunicações de Marketing</h2>
        <p className="mb-4">
          Poderá receber comunicações de marketing da Vista Nova, desde que tenha dado o seu consentimento para tal. Em qualquer momento, pode optar por não receber estas comunicações através dos links de cancelamento de subscrição presentes em cada comunicação ou contactando-nos diretamente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Alterações ao Aviso de Privacidade</h2>
        <p className="mb-4">
          A Vista Nova reserva-se o direito de efetuar alterações ao presente Aviso de Privacidade, devendo estas alterações ser divulgadas através dos nossos canais de comunicação.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-primary mb-4">Contacto do Encarregado de Proteção de Dados</h2>
        <p className="mb-4">
          Para exercer os seus direitos ou para quaisquer questões relacionadas com a proteção dos seus dados pessoais, pode contactar o nosso Encarregado de Proteção de Dados através de:
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>E-mail: <Link href="mailto:dpo@vistanova.pt" className="text-primary hover:underline">dpo@vistanova.pt</Link></li>
          <li>Telefone: <Link href="tel:+351223750602" className="text-primary hover:underline">+351 22 375 06 02</Link></li>
          <li>Endereço: Rua da Bélgica, 3434–H, 4400-209 Vila Nova de Gaia</li>
        </ul>
        <p className="mt-4">
          Também pode apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD) se considerar que o tratamento dos seus dados pessoais viola o Regulamento Geral de Proteção de Dados.
        </p>
      </section>
    </article>
  );
}
