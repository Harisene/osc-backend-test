export interface AddCoursePayload {
  courseData: {
    title: string;
    description: string;
    duration: string;
    outcome: string;
    collectionId: string;
    authorId: string;
  };
}
