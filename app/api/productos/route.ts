// app/api/productos/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const productos = await prisma.producto.findMany();
    // Devuelve todos los productos en JSON
    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener productos." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    /**
     * data debe ser un objeto con las mismas propiedades de Producto, por ejemplo:
     * { nombre: "Lapicero", precio: 1.5, stock: 100, idCategoria: 2 }
     */
    const productoCreado = await prisma.producto.create({
      data: data,
    });
    return NextResponse.json(productoCreado, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear producto." },
      { status: 500 }
    );
  }
}
