import { UserRole } from "@models/common.model";
import prisma from "@prismaClient/index";
import generateToken from "@utils/generateToken";
import handleError from "@utils/handleError";
import inputValidation from "@utils/inputValidation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { RegisterPayload } from "./model";

const schema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  role: z.enum(["STUDENT", "AUTHOR", "ADMIN"]).optional(),
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
        role: payload.role,
      },
    });

    const token = generateToken({
      id: newUser.id,
      username: newUser.name,
      role: payload.role || UserRole.STUDENT,
    });

    return {
      id: newUser.id,
      token,
    };
  } catch (e) {
    handleError(e);
  }
};

export default register;
