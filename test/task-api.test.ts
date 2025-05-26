import { beforeAll, expect, it } from "vitest";
import { prisma } from "../src/context";
import { createApolloServer } from "../src/server";

let server: ReturnType<typeof createApolloServer>;

beforeAll(async () => {
  server = createApolloServer();
  await server.start();

  await prisma.task.deleteMany();
  await prisma.task.create({
    data: {
      title: "Test Task",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
});

it("fetches all tasks", async () => {
  const res = await server.executeOperation({
    query: `query {
            tasks {
                id
                title
            }
        }`,
  });

  function getResult(res: any) {
    return res.body.singleResult;
  }

  const result = getResult(res);

  expect(result.errors).toBeUndefined();
  expect(result.data?.tasks[0].title).toBe("Test Task");
});
