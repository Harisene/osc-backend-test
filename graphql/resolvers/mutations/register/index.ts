import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "../../../../prisma";
import generateToken from "../../../../utils/generateToken";
import { RegisterPayload } from "./register.model";

const schema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

const register = async (_, payload: RegisterPayload) => {
  const validation = schema.safeParse(payload);

  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

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
};

export default register;
