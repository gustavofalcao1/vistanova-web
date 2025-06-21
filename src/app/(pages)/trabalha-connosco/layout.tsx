import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trabalha Conosco | VISTA NOVA',
  description: 'Faça parte da nossa equipe de especialistas em crédito e ajude-nos a transformar sonhos em realidade.',
};

export default function TrabalhaConoscoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
