import { builder } from "../builder";

builder.prismaObject("Task", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    completed: t.exposeBoolean("completed"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),
  }),
});

builder.queryField("tasks", (t) =>
  t.prismaField({
    type: ["Task"],
    resolve: (query, _root, _args, ctx) => {
      return ctx.prisma.task.findMany({ ...query });
    },
  })
);

builder.queryField("task", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const task = await ctx.prisma.task.findUnique({
        ...query,
        where: { id: Number(args.id) },
      });

      if (!task) {
        throw new Error(`Task with ID ${args.id} not found`);
      }

      return task;
    },
  })
);
