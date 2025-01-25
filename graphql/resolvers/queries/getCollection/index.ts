import { z } from "zod";
import prisma from "../../../../prisma";
import handleError from "../../../../utils/handleError";
import inputValidation from "../../../../utils/inputValidation";
import { GetCollectionPayload } from "./model";

const schema = z.object({
  id: z.string().min(1, "Collection id is required."),
});

const getCollection = async (_, payload: GetCollectionPayload) => {
  try {
    inputValidation(schema, payload);

    const collection = await prisma.collection.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        courses: true,
      },
    });
    return collection;
  } catch (e) {
    handleError(e);
  }
};

export default getCollection;
