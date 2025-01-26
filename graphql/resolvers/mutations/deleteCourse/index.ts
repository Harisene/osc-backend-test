import { ResolverContext, UserRole } from "@models/common.model";
import handleError from "@utils/handleError";
import inputValidation from "@utils/inputValidation";
import { z } from "zod";
import prisma from "../../../../prisma/index";
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
    inputValidation(schema, payload);

    if (context.user?.role === UserRole.ADMIN) {
      await performCourseDelete(payload);
      return payload.id;
    }

    const course = await prisma.course.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        authorId: true,
      },
    });

    if (!course) {
      throw new Error(`NotFound: Course ${payload.id} not found`);
    }

    if (course.authorId !== context.user.id) {
      throw new Error(
        "UnAuthorized: User not allowed to delete other authors' courses."
      );
    }

    await performCourseDelete(payload);

    return payload.id;
  } catch (e) {
    handleError(e);
  }
};

const performCourseDelete = async (payload: DeleteCoursePayload) => {
  return await prisma.course.delete({
    where: {
      id: payload.id,
    },
  });
};

export default deleteCourse;
