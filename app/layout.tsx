import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistema de Gestión de Productos',
  description: 'CRUD de productos con Next.js y SQLite',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
