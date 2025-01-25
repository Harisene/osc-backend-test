import { z } from "zod";
import { LoginPayload } from "./model";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma";
import generateToken from "../../../../utils/generateToken";
import handleError from "../../../../utils/handleError";

const schema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

const login = async (_, payload: LoginPayload) => {
  const validation = schema.safeParse(payload);

  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        name: payload.username,
      },
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    const validPassword = await bcrypt.compare(payload.password, user.password);

    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const token = generateToken({ id: user.id, username: user.name });

    return {
      id: user.id,
      token,
    };
  } catch (e) {
    handleError(e);
  }
};

export default login;
