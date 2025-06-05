-- CreateTable
CREATE TABLE "Producto" (
    "idProducto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "idCategoria" INTEGER NOT NULL
);
