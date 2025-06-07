'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    idCategoria: "1"  // Default category
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al crear el producto');
      }

      router.push('/productos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el producto');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push('/productos')} 
            className="p-2 mr-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Nuevo Producto</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex">
              <svg className="h-6 w-6 text-red-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg border border-gray-100">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre del producto
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Ej: Memoria RAM 8GB"
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio" className="form-label">
              Precio (S/)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">S/</span>
              </div>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="form-control pl-10"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="form-label">
              Stock disponible
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="idCategoria" className="form-label">
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
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSubmitting ? "Guardando..." : "Guardar Producto"}
          </button>
        </form>
      </div>
    </>
  );
}
