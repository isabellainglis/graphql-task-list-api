import { builder } from "../builder";

builder.prismaObject("Task", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    completed: t.exposeBoolean("completed"),
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

builder.queryType({});
