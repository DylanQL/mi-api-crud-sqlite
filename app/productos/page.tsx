'use client'

import { useState, useEffect } from "react";
import Link from "next/link";

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  stock: number;
  idCategoria: number;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProductos() {
    try {
      setLoading(true);
      const res = await fetch('/api/productos');
      if (!res.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await res.json();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Error al eliminar el producto');
      }
      
      // Actualizar la lista de productos
      fetchProductos();
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('Error al eliminar el producto');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Lista de Productos</h1>
          <Link 
            href="/productos/nuevo" 
            className="btn btn-primary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo Producto
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <div className="overflow-x-auto table-container">
            <table className="table-styled">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        No hay productos disponibles
                      </div>
                    </td>
                  </tr>
                ) : (
                  productos.map((producto) => (
                    <tr key={producto.idProducto}>
                      <td>{producto.idProducto}</td>
                      <td className="font-medium text-gray-900">{producto.nombre}</td>
                      <td>
                        <span className="font-medium text-green-700">
                          S/ {producto.precio.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          producto.stock > 50 
                            ? 'bg-green-100 text-green-800' 
                            : producto.stock > 20 
                              ? 'bg-blue-100 text-blue-800'
                              : producto.stock > 10
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {producto.stock} unidades
                        </span>
                      </td>
                      <td>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Categoría {producto.idCategoria}
                        </span>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <Link 
                            href={`/productos/${producto.idProducto}/editar`}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-900 font-medium"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(producto.idProducto)}
                            className="flex items-center text-sm text-red-600 hover:text-red-900 font-medium"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
