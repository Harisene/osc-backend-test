export interface GetCoursesPayload {
  limit?: number;
  page?: number;
  sortOrder?: SortOrder;
}

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
