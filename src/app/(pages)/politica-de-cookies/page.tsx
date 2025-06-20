import Link from 'next/link';

export const metadata = {
  title: 'Política de Cookies | Vista Nova',
  description: 'Saiba como utilizamos cookies e tecnologias semelhantes no nosso site.',
};

export default function PoliticaCookies() {
  return (
    <article className="prose max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">POLÍTICA DE COOKIES</h1>
      
      <p className="text-base text-gray-700 mb-8 font-medium uppercase">
        ESTAMOS EMPENHADOS EM PROTEGER A PRIVACIDADE E OS DADOS PESSOAIS DOS UTILIZADORES DO WEBSITE, PELO QUE, 
        ELABORAMOS ESTA POLÍTICA DE COOKIES. NESTA POLÍTICA, INFORMAMOS COMO SÃO UTILIZADOS COOKIES E OUTRAS 
        TECNOLOGIAS SEMELHANTES, PELO QUE, ACONSELHAMOS A SUA LEITURA.
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
        <h2 className="text-2xl font-bold text-primary mb-4">2. O QUE SÃO COOKIES?</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="mb-4">
            Os <em>cookies</em> são ficheiros de dados de pequena dimensão que são instalados no seu computador quando visita 
            um website online. Estes são utilizados para registar determinadas interações da navegação nesse website 
            e armazenar dados que poderão ser atualizados e recuperados, por exemplo, configurações e preferências do Utilizador.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">3. PARA QUE SERVEM OS <em>COOKIES</em>?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>A Vista Nova</strong> irá armazenar <em>cookies</em> no seu equipamento para conseguir proporcionar uma melhor 
            experiência de navegação ao utilizador. Estes cookies permitem personalizar e facilitar ao máximo a navegação, 
            mas também nos são úteis para a solução de problemas, estatísticas, garantia de qualidade, e para monitorar 
            a segurança do sistema.
          </li>
          <li>
            Poderá, a todo o tempo, eliminar ou bloquear os referidos <em>cookies</em>, sendo que, ao fazê-lo, alguns recursos 
            deste website poderão não funcionar como previsto.
          </li>
          <li>
            Os <em>cookies</em> não são utilizados para quaisquer finalidades que não as aqui descritas.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">4. TIPOS DE COOKIES.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <p className="mb-4">
              Os <em>cookies</em> presentes no nosso website são utilizados para diferentes finalidades, mas, em geral, 
              a sua utilização pode ser dividida nas seguintes categorias:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong><em>Cookies</em> estritamente necessários ou funcionais</strong>: são <em>cookies</em> que são essenciais para o normal funcionamento do website e para todos os serviços 
                solicitados, como por exemplo para a navegação ou acesso à página. Sem estes, o website poderá 
                não funcionar devidamente.
              </li>
              <li>
                <strong><em>Cookies</em> de desempenho ou estatística</strong>: são aqueles <em>cookies</em> que fornecem informações estatísticas sobre o uso do website, ou seja, 
                a análise da web, ajudando a perceber como é que os utilizadores interagem com o mesmo.
              </li>
              <li>
                <strong><em>Cookies</em> de Funcionalidade</strong>: são <em>cookies</em> utilizados para melhorar a funcionalidade do website, como proteção contra spam, 
                mapas incorporados e outras funcionalidades interativas.
              </li>
            </ol>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">5. OS <em>COOKIES</em> DE TERCEIROS</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Alguns <em>cookies</em> poderão, ainda, ser armazenados por terceiros que não a <strong>Vista Nova</strong>.
          </li>
          <li>
            Esses terceiros são prestadores de serviços e, embora a <strong>Vista Nova</strong> realize todos os 
            esforços no sentido de recorrer apenas a prestadores de serviços que forneçam garantias de utilização 
            de medidas técnicas e organizativas adequadas e conformes aos requisitos da legislação relevante em 
            matéria de proteção de dados, o Utilizador entende que a <strong>Vista Nova</strong> não é responsável 
            pelo conteúdo e exatidão das políticas de privacidade e de <em>cookies</em> destes terceiros.
          </li>
          <li>
            No <strong>Ponto 7</strong> encontra uma descrição de todos os <em>cookies</em> utilizados.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">6. COMO UTILIZAMOS COOKIES?</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Com exceção dos cookies especificamente necessários ao desempenho do website, o armazenamento de outros 
            cookies dependerá sempre da aceitação e consentimento do Utilizador, podendo esse consentimento ser 
            retirado a todo o tempo através de ferramentas específicas do browser.
          </li>
          <li>
            Sempre que o utilizador não preste o seu consentimento para a utilização de cookies, iremos utilizar 
            apenas os cookies estritamente necessários ao funcionamento do website.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">7. COOKIES QUE UTILIZAMOS.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <p className="mb-6">
              A seguinte tabela explica de que forma são utilizados cookies no website.
            </p>
            
            <div className="overflow-x-auto space-y-8">
              <div>
                <h3 className="text-lg font-bold text-primary mb-4 text-center"><em>Cookies Estritamente Necessários</em></h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-center font-bold">Origem</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Nome</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Descrição</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Duração</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">Usercentrics</td>
                        <td className="border border-gray-300 p-3 text-center">uc_user_interaction</td>
                        <td className="border border-gray-300 p-3 text-center">Armazena as preferências de consentimento do utilizador</td>
                        <td className="border border-gray-300 p-3 text-center">1 ano</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">Usercentrics</td>
                        <td className="border border-gray-300 p-3 text-center">uc_settings</td>
                        <td className="border border-gray-300 p-3 text-center">Configurações de cookies necessárias ao funcionamento</td>
                        <td className="border border-gray-300 p-3 text-center">1 ano</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">Vista Nova</td>
                        <td className="border border-gray-300 p-3 text-center">session</td>
                        <td className="border border-gray-300 p-3 text-center">Identificação de sessão para funcionamento do website</td>
                        <td className="border border-gray-300 p-3 text-center">Sessão</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4 text-center"><strong><em>Cookies de Desempenho</em></strong></h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-center font-bold">Origem</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Nome</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Descrição</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Duração</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">Google Analytics</td>
                        <td className="border border-gray-300 p-3 text-center">_ga</td>
                        <td className="border border-gray-300 p-3 text-center">Distingue utilizadores únicos e recolhe estatísticas de uso</td>
                        <td className="border border-gray-300 p-3 text-center">2 anos</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">Google Analytics</td>
                        <td className="border border-gray-300 p-3 text-center">_ga_*</td>
                        <td className="border border-gray-300 p-3 text-center">Recolhe dados sobre interações dos utilizadores</td>
                        <td className="border border-gray-300 p-3 text-center">2 anos</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4 text-center"><em>Cookies de Funcionalidade</em></h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-center font-bold">Origem</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Nome</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Descrição</th>
                        <th className="border border-gray-300 p-3 text-center font-bold">Duração</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">Google reCAPTCHA</td>
                        <td className="border border-gray-300 p-3 text-center">_GRECAPTCHA</td>
                        <td className="border border-gray-300 p-3 text-center">Proteção contra spam e atividades maliciosas</td>
                        <td className="border border-gray-300 p-3 text-center">6 meses</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">Google Maps</td>
                        <td className="border border-gray-300 p-3 text-center">NID</td>
                        <td className="border border-gray-300 p-3 text-center">Funcionalidade de mapas incorporados</td>
                        <td className="border border-gray-300 p-3 text-center">6 meses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">8. CONTROLO E GESTÃO DE COOKIES.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            A todo o tempo poderá controlar e/ou eliminar os <em>cookies</em>, nomeadamente, poderá eliminar todos os 
            <em>cookies</em> que já estejam armazenados no seu equipamento, podendo inclusivamente configurar a maioria 
            dos <em>browsers</em> de forma a prevenir o seu armazenamento.
          </li>
          <li>
            Para que consiga efetuar essa gestão, terá, no entanto, que ajustar manualmente algumas preferências 
            de cada vez que visita determinados websites, sem as quais alguns serviços e funcionalidades poderão 
            não funcionar.
          </li>
          <li>
            <p className="mb-2">
              Como garantia adicional poderá, a todo o tempo, desativar os <em>cookies</em>, configurando o seu <em>browser</em>, 
              de acordo com as instruções disponíveis em:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Para utilizadores do Google Chrome: 
                <Link href="http://support.google.com/chrome/bin/answer.py?hl=en&answer=95647" className="text-primary hover:underline ml-1">
                  http://support.google.com/chrome/bin/answer.py?hl=en&answer=95647
                </Link>
              </li>
              <li>
                Para utilizadores do Microsoft Edge: 
                <Link href="https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy" className="text-primary hover:underline ml-1">
                  https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy
                </Link>
              </li>
              <li>
                Para utilizadores do Mozilla Firefox: 
                <Link href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-primary hover:underline ml-1">
                  https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences
                </Link>
              </li>
              <li>
                Para utilizadores do Apple Safari: 
                <Link href="http://support.apple.com/kb/ph5042" className="text-primary hover:underline ml-1">
                  http://support.apple.com/kb/ph5042
                </Link>
              </li>
            </ol>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">9. ALTERAÇÕES À POLÍTICA DE <em>COOKIES</em>.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            A <strong>Vista Nova</strong> reserva-se no direito de reajustar ou alterar a presente Política 
            a qualquer momento, sendo essas alterações publicitadas.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">10. OS NOSSOS DETALHES DE CONTACTO.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            Caso tenha alguma dúvida ou questão relacionada com esta Política de Cookies, por favor contacte-nos 
            por escrito através do <em>email</em> <Link href="mailto:dadospessoais@vistanova.pt" className="text-primary hover:underline">dadospessoais@vistanova.pt</Link>.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">11. ÚLTIMA VERSÃO.</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <div className="bg-primary/5 p-6 rounded-lg">
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
