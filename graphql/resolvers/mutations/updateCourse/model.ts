export interface UpdateCoursePayload {
  id: string;
  courseData: {
    title: string;
    description: string;
    duration: string;
    outcome: string;
  };
}
