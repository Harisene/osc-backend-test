import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "../../../../prisma";
import generateToken from "../../../../utils/generateToken";
import handleError from "../../../../utils/handleError";
import inputValidation from "../../../../utils/inputValidation";
import { RegisterPayload } from "./model";

const schema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

const register = async (_, payload: RegisterPayload) => {
  try {
    inputValidation(schema, payload);
    const user = await prisma.user.findFirst({
      where: {
        name: payload.username,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: payload.username,
        password: hashedPassword,
      },
    });

    const token = generateToken({ id: newUser.id, username: newUser.name });

    return {
      id: newUser.id,
      token,
    };
  } catch (e) {
    handleError(e);
  }
};

export default register;
