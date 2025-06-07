'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-[#1a2532] text-white">
      <div className="w-full px-4">
        <div className="flex h-14">
          <div className="flex items-center space-x-6 ml-4">
            <Link
              href="/"
              className={`text-sm py-2 ${
                pathname === '/' 
                  ? 'font-semibold' 
                  : 'font-normal hover:text-gray-300'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className={`text-sm py-2 ${
                pathname.startsWith('/productos') 
                  ? 'font-semibold' 
                  : 'font-normal hover:text-gray-300'
              }`}
            >
              Ventas
            </Link>
            <Link
              href="/almacen" 
              className={`text-sm py-2 ${
                pathname.startsWith('/almacen') 
                  ? 'font-semibold' 
                  : 'font-normal hover:text-gray-300'
              }`}
            >
              Almacén
            </Link>
          </div>
          
          {/* Mobile menu button - only show on small screens */}
          <div className="md:hidden ml-auto flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu button */}
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon for close button */}
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-4 pt-2 pb-3 space-y-2 border-t border-[#2a3542]">
          <Link
            href="/"
            className={`block py-2 text-sm ${
              pathname === '/' 
                ? 'font-semibold' 
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            className={`block py-2 text-sm ${
              pathname.startsWith('/productos') 
                ? 'font-semibold' 
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Ventas
          </Link>
          <Link
            href="/almacen"
            className={`block py-2 text-sm ${
              pathname.startsWith('/almacen') 
                ? 'font-semibold' 
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Almacén
          </Link>
        </div>
      </div>
    </nav>
  );
}
