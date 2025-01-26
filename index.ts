import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { Mutation, Query } from "./graphql/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authDirectiveTransformer } from "./directives/authDirective";
import extractAuthToken from "./middlewares/extractAuthToken";

const startServer = async () => {
  // Load schema from schema.graphql
  const typeDefs = fs.readFileSync(
    path.join(__dirname, "/graphql/schema.graphql"),
    "utf-8"
  );

  // Create the base schema
  let schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
  });

  // Apply the auth directive
  schema = authDirectiveTransformer(schema);

  // Initialize Apollo Server
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  const app = express();

  // Middlewares
  app.use(extractAuthToken);

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: (req as any).token }),
    })
  );

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
