import { CACHE_KEYS } from "@cache/index";
import { ResolverContext } from "@models/common.model";
import prisma from "../../../../prisma/index";
import handleError from "@utils/handleError";

const getCollections = async (_, __, context: ResolverContext) => {
  try {
    const cachesMap = context.cachedMap;

    if (cachesMap.has(CACHE_KEYS.COLLECTIONS)) {
      return cachesMap.get(CACHE_KEYS.COLLECTIONS);
    }

    const collections = await prisma.collection.findMany({
      orderBy: {
        name: "asc",
      },
    });

    cachesMap.set(CACHE_KEYS.COLLECTIONS, collections);
    return collections;
  } catch (e) {
    handleError(e);
  }
};

export default getCollections;
