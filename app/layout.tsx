import type { Metadata } from 'next';
import './globals.css';
import { FilmGrain } from '@/components/kinetic/film-grain';
import { MagneticCursor } from '@/components/kinetic/magnetic-cursor';

export const metadata: Metadata = {
  title: 'Angel Macwan — Data Systems, Biological AI & Agentic Architectures',
  description:
    'Data Engineer at IBM architecting enterprise data pipelines, AI & Computational Biology researcher (pending publication) in ocular morphometrics and biomedical NLP, and independent creator of Thallus, Pluto, and PrivateRAG.',
  keywords: [
    'Angel Macwan',
    'Data Engineer',
    'IBM',
    'Computational Biology',
    'Meibomian Gland',
    'Ocular Morphometrics',
    'Biomedical NLP',
    'Disease Gene Association',
    'Snowflake',
    'Databricks',
    'Thallus',
    'Pluto',
    'PrivateRAG'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mode="dark">
      <body className="antialiased selection:bg-[#FF3B00] selection:text-white">
        <FilmGrain />
        <MagneticCursor />
        {children}
      </body>
    </html>
  );
}
