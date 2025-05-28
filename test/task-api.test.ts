import { beforeAll, expect, it } from "vitest";
import { prisma } from "../src/context";
import { createApolloServer } from "../src/server";
import { unwrapResult } from "./utils/test-helpers";

let server: ReturnType<typeof createApolloServer>;
let createdTaskId: number;

beforeAll(async () => {
  server = createApolloServer();
  await server.start();

  await prisma.task.deleteMany();
  const task = await prisma.task.create({
    data: {
      title: "Test Task",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  createdTaskId = task.id;
});

it("fetches all tasks", async () => {
  const res = await server.executeOperation(
    {
      query: `query {
            tasks {
                id
                title
            }
        }`,
    },
    {
      contextValue: { prisma },
    }
  );

  const result = unwrapResult(res);
  const data = result.data as { tasks: { title: string }[] };

  expect(result.errors).toBeUndefined();
  expect(data.tasks[0].title).toBe("Test Task");
});

it("fetches a single task by ID", async () => {
  const res = await server.executeOperation(
    {
      query: `
            query GetTask($id: ID!) {
            task(id: $id) {
            id
            title
            completed
            }
            }`,
      variables: {
        id: createdTaskId,
      },
    },
    {
      contextValue: { prisma },
    }
  );

  const result = unwrapResult(res);

  expect(result.errors).toBeUndefined();
  expect(result.data?.task).toMatchObject({
    id: String(createdTaskId),
    title: "Test Task",
    completed: false,
  });
});
