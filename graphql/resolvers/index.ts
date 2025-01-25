import addCollection from "./mutations/addCollection";
import addCourse from "./mutations/addCourse";
import deleteCourse from "./mutations/deleteCourse";
import register from "./mutations/register";
import updateCourse from "./mutations/updateCourse";
import getCollection from "./queries/getCollection";
import getCollections from "./queries/getCollections";
import getCourse from "./queries/getCourse";
import getCourses from "./queries/getCourses";
import login from "./queries/login";

const Mutation = {
  register,
  addCollection,
  addCourse,
  updateCourse,
  deleteCourse,
};

const Query = {
  login,
  getCollections,
  getCollection,
  getCourse,
  getCourses,
};

export { Mutation, Query };
