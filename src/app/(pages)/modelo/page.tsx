import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página de Modelo | Vista Nova',
  description: 'Modelo de página para o site da Vista Nova.',
};

export default function ModeloPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Título da Página</h1>
          
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Seção de Conteúdo</h2>
            <p className="text-gray-700">
              Este é um modelo de página em branco com o header e footer do site.
              Adicione seu conteúdo aqui.
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cards de exemplo */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-2">Card {item}</h3>
                <p className="text-gray-600">
                  Conteúdo do card {item}. Personalize conforme necessário.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
