'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewProducto() {
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '', idCategoria: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/productos', {
      method: 'POST',
      body: JSON.stringify({
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
        idCategoria: parseInt(form.idCategoria)
      }),
    });
    router.push('/productos');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold mb-4">Formulario de Producto</h1>
      <input type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="block border p-2 my-2 w-full" />
      <input type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} className="block border p-2 my-2 w-full" />
      <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="block border p-2 my-2 w-full" />
      <input type="number" placeholder="ID Categoría" value={form.idCategoria} onChange={(e) => setForm({ ...form, idCategoria: e.target.value })} className="block border p-2 my-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
}
