import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { UserRole } from "@models/common.model";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import jwt from "jsonwebtoken";

export function roleDirectiveTransformer(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const roleDirective = getDirective(schema, fieldConfig, "role")?.[0];

      if (roleDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const requiredRoles = roleDirective.roles as UserRole[];

        fieldConfig.resolve = async function (source, args, context, info) {
          const token = context?.token;

          if (!token) {
            return resolve(source, args, context, info);
          }

          try {
            const user = jwt.verify(token, process.env.TOKEN_SECRET) as {
              id: string;
              username: string;
              role: UserRole;
            };

            if (!requiredRoles.some((role) => user.role === role)) {
              throw new Error(`Forbidden`);
            }

            return resolve(source, args, context, info);
          } catch (error) {
            if (error instanceof Error && error.message === "Forbidden") {
              throw new Error(
                "Forbidden: You do not have the required roles to access this resource."
              );
            } else if (error.name === "TokenExpiredError") {
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
