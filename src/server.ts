import { ApolloServer } from "@apollo/server";
import { schema } from "./schema";

export function createApolloServer() {
  return new ApolloServer({
    schema,
  });
}
