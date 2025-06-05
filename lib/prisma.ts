// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // Para evitar multiples instancias en hot-reload de Next.js
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  global.prisma = prisma;
}

export default prisma;
