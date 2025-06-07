'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    if (openMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [openMenu]);

  return (
    <html lang="es">
      <body>
        <header className="bg-gray-800 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between h-16">
              {/* Logo/Título */}
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
                  Sistema CRUD
                </Link>
              </div>

              {/* Menú Principal */}
              <ul className="flex space-x-8 relative">
                {/* Inicio */}
                <li>
                  <Link 
                    href="/" 
                    className="hover:text-gray-300 transition-colors duration-200 font-medium"
                  >
                    Inicio
                  </Link>
                </li>

                {/* Menú Ventas */}
                <li className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu('ventas');
                    }} 
                    className="hover:text-gray-300 transition-colors duration-200 font-medium focus:outline-none flex items-center"
                  >
                    Ventas
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openMenu === 'ventas' && (
                    <ul 
                      className="absolute left-0 top-full bg-gray-700 mt-1 py-2 rounded-md shadow-lg min-w-48 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <li>
                        <Link 
                          href="/ventas/cliente" 
                          className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-200"
                          onClick={() => setOpenMenu(null)}
                        >
                          Gestión de Clientes
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/ventas/venta" 
                          className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-200"
                          onClick={() => setOpenMenu(null)}
                        >
                          Gestión de Ventas
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Menú Almacén */}
                <li className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu('almacen');
                    }} 
                    className="hover:text-gray-300 transition-colors duration-200 font-medium focus:outline-none flex items-center"
                  >
                    Almacén
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openMenu === 'almacen' && (
                    <ul 
                      className="absolute left-0 top-full bg-gray-700 mt-1 py-2 rounded-md shadow-lg min-w-48 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <li>
                        <Link 
                          href="/almacen/producto" 
                          className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-200"
                          onClick={() => setOpenMenu(null)}
                        >
                          Gestión de Productos
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/almacen/categoria" 
                          className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-200"
                          onClick={() => setOpenMenu(null)}
                        >
                          Gestión de Categorías
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
