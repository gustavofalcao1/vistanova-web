import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | VISTA NOVA',
  description: 'Conheça nossa política de privacidade e como protegemos seus dados pessoais.',
};

export default function PoliticaPrivacidade() {
  return (
    <article className="prose max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">POLÍTICA DE PRIVACIDADE</h1>
      
      <p className="text-base text-gray-700 mb-8 font-medium uppercase">
        ESTAMOS EMPENHADOS EM PROTEGER A PRIVACIDADE E OS DADOS PESSOAIS DOS UTILIZADORES DO WEBSITE, PELO QUE, 
        ELABORAMOS ESTA POLÍTICA E AS PRÁTICAS AQUI DESCRITAS. NESTA POLÍTICA, EXPLICAMOS COMO SÃO RECOLHIDOS E 
        TRATADOS OS SEUS DADOS PESSOAIS, PELO QUE, ACONSELHAMOS A SUA LEITURA.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">1. IDENTIFICAÇÃO DA ENTIDADE RESPONSÁVEL PELO TRATAMENTO DE DADOS.</h2>
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <p className="mb-2"><strong>Entidade:</strong> Vista Nova, Unipessoal Lda. (adiante, &ldquo;<strong>Vista Nova</strong>&rdquo;)</p>
          <p className="mb-2"><strong>NIPC</strong>: 509326730</p>
          <p className="mb-2"><strong>Sede</strong>: Rua da Bélgica, 3434-H, 4400-209 Vila Nova de Gaia (Portugal)</p>
          <p className="mb-2"><strong>Contacto telefónico</strong>: <Link href="tel:+351965091853" className="text-primary hover:underline">96 509 18 53</Link> / <Link href="tel:+351223750602" className="text-primary hover:underline">22 375 06 02</Link></p>
          <p><strong>Email</strong>: <Link href="mailto:geral@vistanova.pt" className="text-primary hover:underline">geral@vistanova.pt</Link></p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">2. DO QUE TRATA ESTA POLÍTICA?</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Esta Política de Privacidade explica como recolhemos e tratamos os dados pessoais que são necessários para o fornecimento de serviços que estão disponíveis através do website, descrevendo as práticas adotadas para esse efeito.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">3. O QUE SÃO DADOS PESSOAIS?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Dados pessoais são todas as informações relativas a uma pessoa e que a identificam, ou a tornam identificável, independentemente da natureza e suporte das informações, incluindo o som e a imagem da pessoa.
          </li>
          <li>
            Por identificável, deve entender-se uma pessoa que possa ser identificada, direta ou indiretamente, designadamente por referência a um número de identificação ou a outros elementos específicos da sua identidade física, fisiológica, psíquica, económica, cultural ou social.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">4. COMO VAMOS UTILIZAR OS SEUS DADOS PESSOAIS?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            As operações de tratamento de dados pessoais que realizamos são uma ferramenta essencial para a sua satisfação e para a atividade da <strong>Vista Nova</strong> e são realizadas de acordo com a legislação aplicável e conforme as melhores práticas.
          </li>
          <li>
            Os seus dados pessoais não serão reutilizados para outras finalidades que não sejam previamente identificadas ou que não tenham qualquer relação com aquelas finalidades para as quais foram inicialmente recolhidos.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">5. QUAIS AS FINALIDADES, FUNDAMENTOS E PRAZOS DE CONSERVAÇÃO DOS DADOS RECOLHIDOS?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Os dados pessoais que tratamos têm fundamentos específicos, consoante as finalidades a que se destinam, e serão conservados pelo tempo necessário às finalidades respetivas, conforme elencado nesta Política de Privacidade.
          </li>
          <li>
            Os dados pessoais recolhidos são apenas aqueles necessários e adequados às finalidades indicadas.
          </li>
          <li>
            <p className="mb-4">Na tabela seguinte pode visualizar quais as finalidades de tratamento e dados recolhidos para as mesmas, os fundamentos respetivos e os prazos ou critérios de conservação de dados:</p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-center font-bold">FINALIDADE</th>
                    <th className="border border-gray-300 p-3 text-center font-bold">FUNDAMENTO</th>
                    <th className="border border-gray-300 p-3 text-center font-bold">DADOS RECOLHIDOS</th>
                    <th className="border border-gray-300 p-3 text-center font-bold">PRAZO DE CONSERVAÇÃO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">Para analisar e dar seguimento ao seu processo de candidatura para trabalhar com a <strong>Vista Nova</strong>.</td>
                    <td className="border border-gray-300 p-3 text-center">Diligências pré-contratuais</td>
                    <td className="border border-gray-300 p-3 text-center">Nome; Email; Contacto telefónico; Dados constantes do CV; Mensagem e dados pessoais que desta possam constar.</td>
                    <td className="border border-gray-300 p-3 text-center">1 ano</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">Para podermos enviar newsletters</td>
                    <td className="border border-gray-300 p-3 text-center">Consentimento para essa finalidade específica.</td>
                    <td className="border border-gray-300 p-3 text-center">Email.</td>
                    <td className="border border-gray-300 p-3 text-center">2 anos</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">Para analisar e responder ao seu pedido de contacto.</td>
                    <td className="border border-gray-300 p-3 text-center">Consentimento para essa finalidade específica.</td>
                    <td className="border border-gray-300 p-3 text-center">Nome; Email; Mensagem e dados pessoais que desta possam constar.</td>
                    <td className="border border-gray-300 p-3 text-center">Por 1 ano ou pelo período considerado necessário à prossecução desta finalidade, se superior a 1 ano.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">Para as operações de gestão do <strong>website</strong>.</td>
                    <td className="border border-gray-300 p-3 text-center">Consentimento para essa finalidade específica (cookies); Interesses legítimos prosseguidos pela <strong>Vista Nova</strong>.</td>
                    <td className="border border-gray-300 p-3 text-center">Cookies; Endereço de IP.</td>
                    <td className="border border-gray-300 p-3 text-center">Consultar a <Link href="/politica-de-cookies" className="text-primary hover:underline"><strong>Política de Cookies</strong></Link>.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">Para prevenção de fraudes e segurança dos sistemas de informação.</td>
                    <td className="border border-gray-300 p-3 text-center">Consentimento para essa finalidade específica (cookies); Interesses legítimos prosseguidos pela <strong>Vista Nova</strong>.</td>
                    <td className="border border-gray-300 p-3 text-center">Cookies; Endereço de IP.</td>
                    <td className="border border-gray-300 p-3 text-center">Consultar a <Link href="/politica-de-cookies" className="text-primary hover:underline"><strong>Política de Cookies</strong></Link>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>
            Caso resulte da lei algum período específico ou obrigatório, o período de conservação dos dados será esse. Em todos os outros casos, os dados pessoais serão conservados no máximo durante os tempos acima indicados, períodos que a <strong>Vista Nova</strong> entende como suficientes para cumprimento das finalidades.
          </li>
          <li>
            Findo o período de conservação, todos os dados pessoais recolhidos serão eliminados.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">6. NEWSLETTERS E OUTRAS COMUNICAÇÕES COMERCIAIS E/OU PROMOCIONAIS</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Poderemos proceder ao envio de newsletters relativas à <strong>Vista Nova</strong> sempre que o utilizador preste o seu consentimento prévio e informado para esta finalidade, assinalando as <em>checkboxes</em> previstas no site para esse efeito.
          </li>
          <li>
            O utilizador poderá retirar o consentimento prestado a qualquer momento, através da opção prevista para esse efeito no rodapé das comunicações enviadas via email (<em>unsubscribe</em>) ou mediante comunicação escrita dirigida à <strong>Vista Nova</strong>, para os contactos indicados no título relativo ao exercício de direitos. A retirada do consentimento não prejudica o tratamento realizado anteriormente à mesma.
          </li>
          <li>
            O previsto no número anterior não impede que a <strong>Vista Nova</strong>, sempre que tenha obtido dos seus clientes, nos termos da legislação relativa a Proteção de Dados Pessoais, o respetivo endereço de email no contexto da venda de um produto ou serviço, possa utilizá-lo para fins de marketing direto dos seus próprios produtos ou serviços análogos aos transacionados, desde que garanta aos clientes em causa, clara e explicitamente, a possibilidade de se oporem, de forma gratuita e fácil, por ocasião de cada mensagem, ao envio desse tipo de comunicações, por exemplo, através da opção de <em>unsubscribe</em>/cancelar subscrição, constante do rodapé dos emails.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">7. COMO RECOLHEMOS OS SEUS DADOS PESSOAIS?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Vamos recolher os seus dados pessoais através dos formulários presentes no website, mas igualmente através do website e da comunicação que este faz com o seu equipamento e mensagens de <em>e-mail</em> que nos envia.
          </li>
          <li>
            <p className="mb-2">Os seus dados pessoais são recolhidos através do seu equipamento da seguinte forma:</p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Quando preenche os formulários constantes do website;</li>
              <li>Através do seu navegador;</li>
              <li>Data e hora do acesso;</li>
              <li>Sistema operativo;</li>
              <li>URLs de referência;</li>
              <li>Através de <em>cookies</em>;</li>
              <li>Através de pixel tags e outras tecnologias semelhantes;</li>
              <li>Endereço IP.</li>
            </ol>
          </li>
          <li>
            A <strong>Vista Nova</strong> assume o compromisso de tratar os seus dados conforme a lei e de forma legítima.
          </li>
          <li>
            A <strong>Vista Nova</strong> não irá vender, nem alugar ou partilhar os seus dados pessoais com terceiros, exceto nos casos claramente identificados nesta Política de Privacidade (ver Ponto 12 para perceber como).
          </li>
          <li>
            Os serviços da <strong>Vista Nova</strong> não são dirigidos a menores, não sendo tratados dados pessoais de menores de forma intencional.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">8. O QUE SÃO COOKIES?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <em>Cookies</em> são pequenos arquivos de informações que ajudam a identificar o seu browser e que podem armazenar informações, por exemplo, configurações e preferências do Utilizador.
          </li>
          <li>
            A <strong>Vista Nova</strong> irá armazenar <em>cookies</em> no seu equipamento para personalizar e facilitar ao máximo a navegação, mas também, para a solução de problemas, estatísticas, garantia de qualidade, e para monitorar a segurança do sistema.
          </li>
          <li>
            Com exceção dos <em>cookies</em> especificamente necessários ao desempenho do website, o armazenamento de outros cookies dependerá sempre da aceitação e consentimento do Utilizador, podendo esse consentimento ser retirado a todo o tempo através de ferramentas específicas do browser.
          </li>
          <li>
            Para saber mais sobre os cookies que utilizamos deve consultar a nossa <Link href="/politica-de-cookies" className="text-primary hover:underline"><strong>Política de Cookies</strong></Link>.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">9. COMO PROTEGEMOS OS SEUS DADOS PESSOAIS?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Os seus dados pessoais são mantidos em segurança através da adoção de diversas medidas de segurança, de caráter técnico e organizativo que garantem que só têm acesso aos dados pessoais os Colaboradores que devem aceder aos mesmos, em conformidade com a necessidade de acesso e regras criadas para o efeito.
          </li>
          <li>
            Para proteger os seus dados pessoais só recorremos a fornecedores de centros de dados que nos ofereçam medidas de segurança adequadas e documentadas, nomeadamente, garantias que os seus dados pessoais são armazenados em servidores que são mantidos em ambientes controlados com acessos limitados.
          </li>
          <li>
            Os dados pessoais são mantidos em servidores seguros junto à Microsoft Ireland Operations Limited (adiante, "Microsoft") com NIPC 980152267 e sede na One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, D18 P521, Ireland, a qual nos oferece as garantias de segurança adequadas à proteção dos dados pessoais contra a sua difusão, perda, uso indevido, alteração, tratamento ou acesso não autorizado bem como, contra qualquer outra forma de tratamento ilícito.
          </li>
          <li>
            Embora tomemos os cuidados e as precauções que entendemos adequadas para proteger os dados pessoais que nos fornece e recolhemos, é preciso ter consciência que nenhum sistema de segurança é impenetrável.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">10. QUAIS SÃO OS SEUS DIREITOS.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <p className="mb-4">Antes de explicarmos como pode exercer os seus direitos, informamos que a legislação lhe atribui os seguintes direitos:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Acesso</strong>: direito de obter a confirmação de que os dados pessoais que lhe digam respeito são ou não objeto de tratamento e, se for esse o caso, o direito de aceder aos seus dados pessoais;
              </li>
              <li>
                <strong>Retificação</strong>: o direito de obter a retificação dos dados pessoais inexatos que lhe digam respeito e a que os seus dados pessoais incompletos sejam completados;
              </li>
              <li>
                <p className="mb-2"><strong>Apagamento</strong>: o direito de obter o apagamento dos seus dados pessoais quando se aplique um dos motivos elencados na legislação, nomeadamente quando:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Os dados pessoais deixaram de ser necessários para a finalidade que motivou a sua recolha ou tratamento;</li>
                  <li>Retirar o consentimento em que se baseia o tratamento dos dados e não existir outro fundamento jurídico para o tratamento;</li>
                  <li>Se opuser ao tratamento e não existirem interesses legítimos prevalecentes que justifiquem o mesmo;</li>
                  <li>Os dados pessoais foram tratados ilicitamente;</li>
                  <li>Os dados pessoais têm de ser apagados para o cumprimento de uma obrigação jurídica;</li>
                  <li>Os dados pessoais foram recolhidos no contexto da oferta de serviços da sociedade da informação.</li>
                </ol>
              </li>
              <li>
                <p className="mb-2"><strong>Limitação do tratamento</strong>: o direito de obter a limitação do tratamento se se aplicar uma das situações elencadas na legislação, nomeadamente quando:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Contestar a exatidão dos dados pessoais;</li>
                  <li>O tratamento for ilícito e o titular dos dados se opuser ao apagamento dos dados pessoais e solicitar, em contrapartida, a limitação da sua utilização;</li>
                  <li>O responsável pelo tratamento já não precisar dos dados pessoais para fins de tratamento, mas esses dados sejam requeridos pelo titular para efeitos de declaração, exercício ou defesa de um direito num processo judicial;</li>
                  <li>Se o titular dos dados tiver oposto ao tratamento com recurso a decisões individuais automatizadas.</li>
                </ol>
              </li>
              <li>
                <strong>Oposição</strong>: o direito de se opor a qualquer momento ao tratamento dos dados pessoais que lhe digam respeito;
              </li>
              <li>
                <strong>Portabilidade</strong>: o direito de receber os dados pessoais que lhe digam respeito num formato estruturado, de uso corrente e de leitura automática, e o direito de transmitir esses dados a outro responsável pelo tratamento sem que o responsável a quem os dados pessoais foram fornecidos o possa impedir, quando o tratamento seja baseado no consentimento ou contrato, ou quando seja realizado através de meios automatizados.
              </li>
            </ol>
          </li>
          <li>
            Tem ainda o direito de apresentar reclamação junto à autoridade de controlo competente (em Portugal, a Comissão Nacional de Proteção de Dados em <Link href="http://www.cnpd.pt" className="text-primary hover:underline">www.cnpd.pt</Link>).
          </li>
          <li>
            Para além dos direitos acima descritos, sempre que o fundamento para o tratamento de dados seja o consentimento, o Utilizador tem o direito de retirar o consentimento prestado a qualquer momento, sem que tal invalide o tratamento de dados realizado até esse momento.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">11. COMO PODE EXERCER OS SEUS DIREITOS?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <p className="mb-2">Poderá exercer os seus direitos, gratuitamente, através de contacto escrito para o seguinte endereço:</p>
            <ol className="list-decimal pl-6">
              <li>Por email: <Link href="mailto:dadospessoais@vistanova.pt" className="text-primary hover:underline">dadospessoais@vistanova.pt</Link>.</li>
            </ol>
          </li>
          <li>
            Caso nos solicite a eliminação de alguns dos seus dados pessoais ou da sua totalidade, alguns dos serviços solicitados poderão não lhe ser prestados. A <strong>Vista Nova</strong> poderá ter que conservar apenas os dados pessoais que possam ser necessários para o cumprimento das obrigações legais a que se encontra vinculada.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">12. QUANDO COMUNICAMOS DADOS A TERCEIROS?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            A <strong>Vista Nova</strong> poderá recorrer a terceiros para a prestação de determinados serviços, a nível de manutenção, apoio técnico ou marketing, podendo estes ter acesso a alguns dos dados pessoais fornecidos, nomeadamente, os dados necessários para os fins contratualizados.
          </li>
          <li>
            A <strong>Vista Nova</strong> assegura que as entidades que tenham acesso aos dados são credíveis e oferecem elevadas garantias de proteção, nunca lhes sendo transmitidos dados para além do necessário à prestação do serviço contratado, permanecendo, contudo, a <strong>Vista Nova</strong> como responsável pelos dados pessoais disponibilizados.
          </li>

          <li>
            <p className="mb-2">A <strong>Vista Nova</strong> poderá ainda comunicar os seus dados às seguintes entidades:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Empresas ou entidades financeiras com quem a <strong>Vista Nova</strong> tenha parcerias comerciais para a criação e oferta de serviços e/ou benefícios; ou ainda,</li>
              <li>Outros parceiros (com autorização prévia da sua parte).</li>
            </ol>
          </li>
          <li>
            A <strong>Vista Nova</strong> poderá ainda transmitir dados a terceiros no âmbito de investigações, inquéritos e processos judiciais e/ou administrativos ou de natureza semelhante, desde que para tal seja devidamente ordenado por ordem judicial nesse sentido.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">13. WEBSITES DE TERCEIROS.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            O nosso website pode conter ligações para outros websites de terceiros que poderão recolher e tratar os seus dados pessoais, sendo que esse tratamento é da exclusiva responsabilidade dos proprietários desses websites, não tendo a <strong>Vista Nova</strong> qualquer responsabilidade pelas suas políticas e/ou práticas.
          </li>
          <li>
            Exemplo desses terceiros é o Instagram, Facebook, TikTok ou o LinkedIn através dos botões que estão presentes no website.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">14. TRANSFERÊNCIAS DE DADOS PARA FORA DA UNIÃO EUROPEIA.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Os seus dados serão por nós tratados dentro do Espaço Económico Europeu.
          </li>
          <li>
            Caso ocorram transferências de dados para países terceiros, não pertencentes à União Europeia ou ao Espaço Económico Europeu, a <strong>Vista Nova</strong> cumprirá com a lei, nomeadamente no que respeita à adequabilidade do país de destino no que respeita a proteção de dados pessoais e aos requisitos que são aplicáveis a estas transferências, não sendo transferidos dados pessoais para jurisdições que não ofereçam garantias de segurança e proteção.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">15. OS MENORES.</h2>
        <ol className="list-decimal pl-6">
          <li>
            O website não é dirigido a menores de 18 anos, pelo que solicitamos que estes menores não nos forneçam dados pessoais através do website, aplicação, redes sociais e social media ou emails.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">16. DADOS PESSOAIS SENSÍVEIS.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            A <strong>Vista Nova</strong> agradece que não nos envie nem nos dê a conhecer quaisquer dados pessoais sensíveis, ou seja, informações que revelem a origem racial ou étnica, opiniões políticas, crenças religiosas ou filosóficas, associação sindical, informações genéticas, informações biométricas, dados relativos à saúde ou dados relativos a vida sexual de uma pessoa natural ou a orientação sexual.
          </li>
          <li>
            Caso ainda assim nos envie ou dê a conhecer essas categorias de dados pessoais, estes serão imediatamente apagados.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">17. ALTERAÇÕES À POLÍTICA DE PRIVACIDADE.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            A <strong>Vista Nova</strong> reserva-se ao direito de reajustar ou modificar a presente Política de Privacidade a qualquer momento, sendo tais alterações publicitadas neste website com a data de entrada em vigor atualizada.
          </li>
          <li>
            A <strong>Vista Nova</strong> recomenda que (re)visite periodicamente esta política de forma a estar ciente de quaisquer alterações efetuadas.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">18. OS NOSSOS DETALHES DE CONTACTO.</h2>
        <ol className="list-decimal pl-6">
          <li>
            Caso tenha alguma dúvida ou questão relacionada com esta Política de Privacidade por favor contacte-nos por escrito através do email <Link href="mailto:dadospessoais@vistanova.pt" className="text-primary hover:underline">dadospessoais@vistanova.pt</Link>.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">19. ÚLTIMA VERSÃO.</h2>
        <ol className="list-decimal pl-6">
          <li>
            <div className="bg-primary/5 p-6 rounded-lg">
              {/* #DEV Finish this DATA*/}
              <p className="text-gray-700">
                [{new Date().getDate().toString().padStart(2, '0')}] [{(new Date().getMonth() + 1).toString().padStart(2, '0')}], 2025, Vila Nova de Gaia (Portugal).
              </p>
            </div>
          </li>
        </ol>
      </section>
    </article>
  );
}
