import { ResolverContext, UserRole } from "@models/common.model";
import prisma from "@prismaClient/index";
import handleError from "@utils/handleError";
import inputValidation from "@utils/inputValidation";
import { z } from "zod";
import { UpdateUserPayload } from "./model";

const schema = z.object({
  id: z.string().min(1, "User id is required."),
  role: z.enum(["STUDENT", "AUTHOR", "ADMIN"]),
});

const updateUser = async (
  _,
  payload: UpdateUserPayload,
  context: ResolverContext
) => {
  try {
    inputValidation(schema, payload);
    if (context.user.role === UserRole.ADMIN) {
      await performUserUpdate(payload);
      return payload.id;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error(`NotFound: User ${payload.id} not found to update.`);
    }

    if (user.id !== context.user.id) {
      throw new Error(
        "UnAuthorized: User not allowed to update another user data."
      );
    }
    return payload.id;
  } catch (e) {
    handleError(e);
  }
};

const performUserUpdate = async (payload: UpdateUserPayload) => {
  return await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      ...payload,
    },
  });
};

export default updateUser;
