'use client';

import Link from 'next/link';

export default function CategoriaPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Categorías</h1>
        <Link
          href="/almacen/categoria/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Nueva Categoría
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Productos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Ejemplo de categorías */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Electrónicos
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Dispositivos y componentes electrónicos
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                5 productos
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                  Editar
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Hogar
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Artículos para el hogar y decoración
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                3 productos
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                  Editar
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Mostrando 2 categorías de 2 total
          </p>
        </div>
      </div>
    </div>
  );
}
