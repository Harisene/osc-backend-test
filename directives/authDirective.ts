import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import jwt from "jsonwebtoken";

export function authDirectiveTransformer(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const token = context?.token;

          if (!token) {
            throw new Error("Unauthorized: Auth token not found!");
          }

          try {
            const user = jwt.verify(token, process.env.TOKEN_SECRET) as {
              id: string;
              username: string;
            };
            delete context.token;
            context.user = {
              id: user.id,
              username: user.username,
            };
            return resolve(source, args, context, info);
          } catch (e) {
            if (e.name === "TokenExpiredError") {
              throw new Error("Token has expired");
            } else {
              throw new Error("Invalid token");
            }
          }
        };
      }

      return fieldConfig;
    },
  });
}
