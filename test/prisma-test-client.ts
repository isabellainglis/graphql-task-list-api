import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function setup() {
  await prisma.task.deleteMany();
}

setup();
