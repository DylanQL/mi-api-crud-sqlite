'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-gray-900 text-white py-3 px-4">
      <div className="flex space-x-6">
        <Link
          href="/"
          className={`hover:text-gray-300 ${pathname === '/' ? 'font-bold' : ''}`}
        >
          Inicio
        </Link>
        <Link
          href="/productos"
          className={`hover:text-gray-300 ${pathname.startsWith('/productos') ? 'font-bold' : ''}`}
        >
          Ventas
        </Link>
        <Link
          href="/almacen" 
          className={`hover:text-gray-300 ${pathname.startsWith('/almacen') ? 'font-bold' : ''}`}
        >
          Almacén
        </Link>
      </div>
    </nav>
  );
}
