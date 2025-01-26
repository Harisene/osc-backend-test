import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import cachedMap from "./cache";
import { authDirectiveTransformer } from "./directives/authDirective";
import { roleDirectiveTransformer } from "./directives/roleDirective";
import { Mutation, Query } from "./graphql/resolvers";
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
  schema = roleDirectiveTransformer(schema);

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
      context: async ({ req }) => ({ token: (req as any).token, cachedMap }),
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
