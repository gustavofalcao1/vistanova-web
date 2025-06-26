import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trabalha Conosco | VISTA NOVA',
  description: 'Junta-te à equipa Vista Nova como Especialista de Crédito. Procuramos pessoas com ética para intermediação de crédito. Licença Banco de Portugal nº 2543.',
  keywords: [
    'trabalhar Vista Nova',
    'especialista de crédito',
    'emprego crédito',
    'carreira intermediação crédito',
    'vaga especialista financeiro',
    'trabalho banco Portugal'
  ],
  openGraph: {
    title: 'Trabalha Conosco | VISTA NOVA',
    description: 'Junta-te à equipa Vista Nova como Especialista de Crédito. Procuramos pessoas com ética para intermediação de crédito.',
    url: 'https://vistanova.pt/trabalha-connosco',
    siteName: 'VISTA NOVA',
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function TrabalhaConoscoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 