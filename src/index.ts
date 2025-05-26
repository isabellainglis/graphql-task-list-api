import { startStandaloneServer } from "@apollo/server/standalone";
import { createApolloServer } from "./server";
import { createContext } from "./context";

const server = createApolloServer();

startStandaloneServer(server, {
  context: async () => createContext(),
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
