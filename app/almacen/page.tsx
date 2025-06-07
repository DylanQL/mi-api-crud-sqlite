'use client'

import { useState, useEffect } from "react";

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  stock: number;
  idCategoria: number;
}

export default function AlmacenPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchProductos();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Inventario de Almacén</h1>

        {loading ? (
          <p>Cargando inventario...</p>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div key={producto.idProducto} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{producto.nombre}</h2>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-semibold">S/ {producto.precio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Stock:</span>
                    <span 
                      className={`font-semibold ${
                        producto.stock < 10 
                          ? 'text-red-600' 
                          : producto.stock < 20 
                            ? 'text-yellow-600' 
                            : 'text-green-600'
                      }`}
                    >
                      {producto.stock} unidades
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-semibold">Categoría {producto.idCategoria}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
