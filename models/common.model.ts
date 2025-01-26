export interface ResolverContext {
  user?: {
    id: string;
    username: string;
  };
  cachedMap: Map<string, unknown>;
}

export enum UserRole {
  STUDENT = "STUDENT",
  AUTHOR = "AUTHOR",
  ADMIN = "ADMIN",
}
