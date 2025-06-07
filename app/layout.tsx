'use client';

import Link from 'next/link';
import { useState } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  return (
    <html lang="es">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-6 relative">
            <li>
              <Link href="/" className="hover:underline">Inicio</Link>
            </li>

            <li>
              <button onClick={() => toggleMenu('ventas')} 
                className="focus:outline-none">
                Ventas
              </button>
              {openMenu === 'ventas' && (
                <ul className="absolute bg-gray-700 mt-1 p-2 rounded shadow">
                  <li><Link href="/ventas/cliente" className="block px-2 py-1 hover:bg-gray-600">Cliente</Link></li>
                  <li><Link href="/ventas/venta" className="block px-2 py-1 hover:bg-gray-600">Venta</Link></li>
                </ul>
              )}
            </li>

            <li>
              <button onClick={() => toggleMenu('almacen')} 
                className="focus:outline-none">
                Almacén
              </button>
              {openMenu === 'almacen' && (
                <ul className="absolute bg-gray-700 mt-1 p-2 rounded shadow">
                  <li><Link href="/almacen/producto" className="block px-2 py-1 hover:bg-gray-600">Producto</Link></li>
                  <li><Link href="/almacen/categoria" className="block px-2 py-1 hover:bg-gray-600">Categoría</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
