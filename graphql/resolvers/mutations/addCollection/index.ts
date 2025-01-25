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
    const collection = await prisma.collection.create({
      data: {
        name: payload.name,
      },
    });
    return collection.id;
  } catch (e) {
    handleError(e);
  }
};

export default addCollection;
