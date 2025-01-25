import { z } from "zod";
import prisma from "../../../../prisma";
import handleError from "../../../../utils/handleError";
import inputValidation from "../../../../utils/inputValidation";
import { GetCoursePayload } from "./model";

const schema = z.object({
  id: z.string().min(1, "Course id is required."),
});

const getCourse = async (_, payload: GetCoursePayload) => {
  try {
    inputValidation(schema, payload);

    const course = await prisma.course.findUnique({
      where: {
        id: payload.id,
      },
    });

    return course;
  } catch (e) {
    handleError(e);
  }
};

export default getCourse;
