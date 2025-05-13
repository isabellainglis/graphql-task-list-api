import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { Context, prisma } from "./context";

export const builder = new SchemaBuilder<{
  PrismaTypes: typeof PrismaTypes;
  Context: Context;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

type TestPrismaTypes = PrismaTypes;

builder.queryType({});
