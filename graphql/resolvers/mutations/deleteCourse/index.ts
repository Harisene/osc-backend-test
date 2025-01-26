import { ResolverContext } from "@models/common.model";
import prisma from "../../../../prisma/index";
import handleError from "@utils/handleError";
import inputValidation from "@utils/inputValidation";
import { z } from "zod";
import { DeleteCoursePayload } from "./model";

const schema = z.object({
  id: z.string().min(1, "Course id is required."),
});

const deleteCourse = async (
  _,
  payload: DeleteCoursePayload,
  context: ResolverContext
) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        authorId: true,
      },
    });

    if (!course || course.authorId !== context.user.id) {
      throw new Error("UnAuthorized: User not allowed to delete this course.");
    }

    inputValidation(schema, payload);

    await prisma.course.delete({
      where: {
        id: payload.id,
      },
    });

    return payload.id;
  } catch (e) {
    handleError(e);
  }
};

export default deleteCourse;
