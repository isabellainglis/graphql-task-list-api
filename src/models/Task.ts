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

builder.mutationField("addTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: (_query, _root, args, ctx) => {
      return ctx.prisma.task.create({
        data: {
          title: args.title,
          completed: false,
        },
      });
    },
  })
);

builder.mutationField("toggleTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_query, _root, args, ctx) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: Number(args.id) },
      });

      if (!task) {
        throw new Error(`Task with ID ${args.id} not found`);
      }

      return ctx.prisma.task.update({
        where: { id: Number(args.id) },
        data: {
          completed: !task.completed,
        },
      });
    },
  })
);

builder.mutationField("deleteTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_query, _root, args, ctx) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: Number(args.id) },
      });

      if (!task) {
        throw new Error(`Task with ID ${args.id} not found`);
      }

      return ctx.prisma.task.delete({
        where: { id: Number(args.id) },
      });
    },
  })
);
