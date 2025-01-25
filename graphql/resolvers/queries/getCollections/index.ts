import prisma from "../../../../prisma";
import handleError from "../../../../utils/handleError";

const getCollections = async (_) => {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return collections;
  } catch (e) {
    handleError(e);
  }
};

export default getCollections;
