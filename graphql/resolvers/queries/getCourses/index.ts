import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../../prisma";
import handleError from "../../../../utils/handleError";
import inputValidation from "../../../../utils/inputValidation";
import { GetCoursesPayload } from "./model";

const schema = z.object({
  limit: z.number().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

const getCourses = async (_, payload: GetCoursesPayload) => {
  try {
    inputValidation(schema, payload);

    const courses = await prisma.course.findMany({
      take: payload.limit,
      orderBy: {
        title: payload.sortOrder.toLowerCase() as Prisma.SortOrder,
      },
    });

    return courses;
  } catch (e) {
    handleError(e);
  }
};

export default getCourses;
