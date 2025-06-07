'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Productos</h1>
          <Link 
            href="/productos/nuevo" 
            className="text-blue-500 hover:text-blue-700"
          >
            + Nuevo Producto
          </Link>
        </div>

        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left border-b">#</th>
                  <th className="py-2 px-4 text-left border-b">Nombre</th>
                  <th className="py-2 px-4 text-left border-b">Precio</th>
                  <th className="py-2 px-4 text-left border-b">Stock</th>
                  <th className="py-2 px-4 text-left border-b">Categoría</th>
                  <th className="py-2 px-4 text-left border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 text-center">
                      No hay productos disponibles
                    </td>
                  </tr>
                ) : (
                  productos.map((producto) => (
                    <tr key={producto.idProducto} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{producto.idProducto}</td>
                      <td className="py-2 px-4 border-b">{producto.nombre}</td>
                      <td className="py-2 px-4 border-b">S/ {producto.precio.toFixed(2)}</td>
                      <td className="py-2 px-4 border-b">{producto.stock}</td>
                      <td className="py-2 px-4 border-b">{producto.idCategoria}</td>
                      <td className="py-2 px-4 border-b">
                        <Link 
                          href={`/productos/${producto.idProducto}/editar`}
                          className="text-blue-500 hover:text-blue-700 mr-3"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(producto.idProducto)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Eliminar
                        </button>
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
