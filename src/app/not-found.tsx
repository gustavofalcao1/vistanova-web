import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você está procurando não existe.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Página não encontrada</p>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe.
        </p>
        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
