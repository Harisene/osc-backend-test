import { z } from "zod";
import prisma from "../../../../prisma";
import handleError from "../../../../utils/handleError";
import { AddCollectionPayload } from "./model";

const schema = z.object({
  name: z.string().min(1, "Collection name is required."),
});

const addCollection = async (_, payload: AddCollectionPayload) => {
  const validation = schema.safeParse(payload);

  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const collection = await prisma.collection.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (collection) {
      throw new Error(`Collection name '${payload.name}' already exists.`);
    }

    const newCollection = await prisma.collection.create({
      data: {
        name: payload.name,
      },
    });
    return newCollection.id;
  } catch (e) {
    handleError(e);
  }
};

export default addCollection;
