import { Metadata } from 'next';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'VISTA NOVA - Especialistas em Crédito',
  description: 'Soluções financeiras personalizadas para suas necessidades de crédito.',
};

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
