import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";
import { createContext } from "./context";

const server = new ApolloServer({
  schema,
});

startStandaloneServer(server, {
  context: async () => createContext(),
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
