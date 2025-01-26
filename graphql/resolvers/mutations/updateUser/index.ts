import { z } from "zod";
import { ResolverContext } from "../../../../models/common.model";
import prisma from "../../../../prisma";
import handleError from "../../../../utils/handleError";
import inputValidation from "../../../../utils/inputValidation";
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
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
      },
    });

    if (!user || user.id !== context.user.id) {
      throw new Error(
        "UnAuthorized: User not allowed to update another user data."
      );
    }

    inputValidation(schema, payload);

    await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        ...payload,
      },
    });

    return payload.id;
  } catch (e) {
    handleError(e);
  }
};

export default updateUser;
