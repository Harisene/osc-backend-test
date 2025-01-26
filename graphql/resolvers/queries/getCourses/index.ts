import { Prisma } from "@prisma/client";
import prisma from "@prismaClient/index";
import handleError from "@utils/handleError";
import inputValidation from "@utils/inputValidation";
import { z } from "zod";
import { GetCoursesPayload } from "./model";

const schema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

const getCourses = async (_, payload: GetCoursesPayload) => {
  try {
    inputValidation(schema, payload);

    const courses = await prisma.course.findMany({
      take: payload.limit,
      skip: payload.page ? (payload.page - 1) * payload.limit : 0,
      orderBy: {
        title: payload.sortOrder
          ? (payload.sortOrder.toLowerCase() as Prisma.SortOrder)
          : "asc",
      },
    });

    return courses;
  } catch (e) {
    handleError(e);
  }
};

export default getCourses;
