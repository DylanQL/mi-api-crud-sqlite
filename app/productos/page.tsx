'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

  // Función para obtener productos
  const obtenerProductos = async () => {
    try {
      const response = await fetch('/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar producto
  const eliminarProducto = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`/api/productos/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Actualizar la lista después de eliminar
          obtenerProductos();
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Cargando productos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold mb-4 text-red-600">
              FRONTEND CON APP ROUTER
            </h1>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Lista de productos</h2>
            <Link 
              href="/productos/new" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Nuevo
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b">#</th>
                  <th className="px-4 py-2 text-left border-b">Nombre</th>
                  <th className="px-4 py-2 text-left border-b">Precio</th>
                  <th className="px-4 py-2 text-left border-b">Stock</th>
                  <th className="px-4 py-2 text-left border-b">idCategoria</th>
                  <th className="px-4 py-2 text-left border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, i) => (
                  <tr key={p.idProducto} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{p.nombre}</td>
                    <td className="px-4 py-2">${p.precio.toFixed(2)}</td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2">{p.idCategoria}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Link 
                        href={`/productos/${p.idProducto}/edit`} 
                        className="text-green-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => eliminarProducto(p.idProducto)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {productos.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No hay productos.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
