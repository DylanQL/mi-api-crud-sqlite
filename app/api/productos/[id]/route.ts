// app/api/productos/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

/**
 * GET /api/productos/[id]
 */
export async function GET(request: Request, { params }: Params) {
  const idProducto = parseInt(params.id);
  if (isNaN(idProducto)) {
    return NextResponse.json(
      { error: "ID de producto inválido." },
      { status: 400 }
    );
  }

  try {
    const producto = await prisma.producto.findUnique({
      where: { idProducto: idProducto },
    });
    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado." },
        { status: 404 }
      );
    }
    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al buscar producto." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/productos/[id]
 * Body: { nombre, precio, stock, idCategoria }
 */
export async function PUT(request: Request, { params }: Params) {
  const idProducto = parseInt(params.id);
  if (isNaN(idProducto)) {
    return NextResponse.json(
      { error: "ID de producto inválido." },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();
    // Actualiza el producto cuyo idProducto == params.id
    const productoActualizado = await prisma.producto.update({
      where: { idProducto: idProducto },
      data: data,
    });
    return NextResponse.json(productoActualizado);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar producto." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/productos/[id]
 */
export async function DELETE(request: Request, { params }: Params) {
  const idProducto = parseInt(params.id);
  if (isNaN(idProducto)) {
    return NextResponse.json(
      { error: "ID de producto inválido." },
      { status: 400 }
    );
  }

  try {
    await prisma.producto.delete({
      where: { idProducto: idProducto },
    });
    return NextResponse.json({ message: "Producto eliminado." });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar producto." },
      { status: 500 }
    );
  }
}
