import bcrypt from "bcryptjs";
import { z } from "zod";
import { UserRole } from "../../../../models/common.model";
import prisma from "../../../../prisma";
import generateToken from "../../../../utils/generateToken";
import handleError from "../../../../utils/handleError";
import inputValidation from "../../../../utils/inputValidation";
import { LoginPayload } from "./model";

const schema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

const login = async (_, payload: LoginPayload) => {
  try {
    inputValidation(schema, payload);
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

    const token = generateToken({
      id: user.id,
      username: user.name,
      role: user.role as UserRole,
    });

    return {
      id: user.id,
      token,
    };
  } catch (e) {
    handleError(e);
  }
};

export default login;
