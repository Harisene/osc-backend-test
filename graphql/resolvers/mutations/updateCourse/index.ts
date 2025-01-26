import { ResolverContext } from "@models/common.model";
import prisma from "../../../../prisma/index";
import handleError from "@utils/handleError";
import inputValidation from "@utils/inputValidation";
import { z } from "zod";
import { UpdateCoursePayload } from "./model";

const schema = z.object({
  id: z.string().min(1, "Course id is required."),
  courseData: z
    .object({
      title: z.string().min(1, "Course title is empty.").optional(),
      description: z.string().min(1, "Course description is empty.").optional(),
      duration: z.string().min(1, "Course duration is empty.").optional(),
      outcome: z.string().min(1, "Course outcome is empty.").optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Must have at least one property of course data to update.",
    }),
});

const updateCourse = async (
  _,
  data: UpdateCoursePayload,
  context: ResolverContext
) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: data.id,
      },
      select: {
        authorId: true,
      },
    });

    if (!course || course.authorId !== context.user.id) {
      throw new Error("UnAuthorized: User not allowed to update this course.");
    }

    inputValidation(schema, data);

    await prisma.course.update({
      where: {
        id: data.id,
      },
      data: {
        ...data.courseData,
      },
    });

    return data.id;
  } catch (e) {
    handleError(e);
  }
};

export default updateCourse;
