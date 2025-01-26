import prisma from "../../../../prisma/index";
import handleError from "@utils/handleError";
import inputValidation from "@utils/inputValidation";
import { z } from "zod";
import { AddCoursePayload } from "./model";

const schema = z.object({
  title: z.string().min(1, "Course title is required."),
  description: z.string().min(1, "Course description is required."),
  duration: z.string().min(1, "Course duration is required."),
  outcome: z.string().min(1, "Course outcome is required."),
  collectionId: z.string().min(1, "Collection id is required."),
  authorId: z.string().min(1, "Author id is required."),
});

const addCourse = async (_, courseData: AddCoursePayload) => {
  try {
    const { courseData: payload } = courseData;
    inputValidation(schema, payload);

    const collection = await prisma.collection.findUnique({
      where: {
        id: payload.collectionId,
      },
    });

    if (!collection) {
      throw new Error(`Collection id ${payload.collectionId} does not exist.`);
    }

    const author = await prisma.user.findUnique({
      where: {
        id: payload.authorId,
      },
    });

    if (!author) {
      throw new Error(`Author id ${payload.authorId} does not exist.`);
    }

    const course = await prisma.course.create({
      data: {
        ...payload,
      },
    });

    return course.id;
  } catch (e) {
    handleError(e);
  }
};

export default addCourse;
