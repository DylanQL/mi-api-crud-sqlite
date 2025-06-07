'use client';

import Link from 'next/link';

export default function VentaPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Ventas</h1>
        <Link
          href="/ventas/venta/new"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Nueva Venta
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Venta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Ejemplo de ventas */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                #001
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Juan Pérez
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                2024-01-15
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                $1,250.00
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Completada
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                  Ver Detalle
                </button>
                <button className="text-blue-600 hover:text-blue-900 mr-4">
                  Imprimir
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Anular
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                #002
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                María García
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                2024-01-16
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                $850.00
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pendiente
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                  Ver Detalle
                </button>
                <button className="text-blue-600 hover:text-blue-900 mr-4">
                  Imprimir
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Anular
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Mostrando 2 ventas de 2 total - Total de ventas: $2,100.00
          </p>
        </div>
      </div>
    </div>
  );
}
