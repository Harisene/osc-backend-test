export interface ResolverContext {
  user: {
    id: string;
    username: string;
  };
}

export enum UserRole {
  STUDENT = "STUDENT",
  AUTHOR = "AUTHOR",
  ADMIN = "ADMIN",
}
