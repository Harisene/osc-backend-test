export interface GetCoursesPayload {
  limit?: number;
  sortOrder?: SortOrder;
}

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
