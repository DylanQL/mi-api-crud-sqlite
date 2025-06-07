'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  stock: number;
  idCategoria: number;
}

export default function EditarProductoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    idCategoria: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducto() {
      try {
        const res = await fetch(`/api/productos/${params.id}`);
        if (!res.ok) {
          throw new Error('Producto no encontrado');
        }
        const producto: Producto = await res.json();
        setFormData({
          nombre: producto.nombre,
          precio: producto.precio.toString(),
          stock: producto.stock.toString(),
          idCategoria: producto.idCategoria.toString()
        });
        setError(null);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducto();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert string values to appropriate types
      const productoData = {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        idCategoria: parseInt(formData.idCategoria)
      };

      const res = await fetch(`/api/productos/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar el producto');
      }

      router.push('/productos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el producto');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <p>Cargando producto...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="precio" className="block mb-1">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block mb-1">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="idCategoria" className="block mb-1">
              Categoría
            </label>
            <select
              id="idCategoria"
              name="idCategoria"
              value={formData.idCategoria}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="1">Categoría 1</option>
              <option value="2">Categoría 2</option>
              <option value="3">Categoría 3</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-green-300"
          >
            {isSubmitting ? "Actualizando..." : "Actualizar Producto"}
          </button>
        </form>
      </div>
    </>
  );
}
