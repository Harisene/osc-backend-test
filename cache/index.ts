// Assuming we have a one server I'm using a Map here. One good option is to go with Redis.
const cachedMap = new Map<string, unknown>();

export const CACHE_KEYS = {
  COLLECTIONS: "COLLECTIONS",
};

export default cachedMap;
