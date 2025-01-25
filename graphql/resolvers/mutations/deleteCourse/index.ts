import { z } from "zod";
import prisma from "../../../../prisma";
import handleError from "../../../../utils/handleError";
import inputValidation from "../../../../utils/inputValidation";
import { DeleteCoursePayload } from "./model";

const schema = z.object({
  id: z.string().min(1, "Course id is required."),
});

const deleteCourse = async (_, payload: DeleteCoursePayload) => {
  try {
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
