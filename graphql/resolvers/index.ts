import addCollection from "./mutations/addCollection";
import addCourse from "./mutations/addCourse";
import deleteCourse from "./mutations/deleteCourse";
import register from "./mutations/register";
import updateCourse from "./mutations/updateCourse";
import getCollections from "./queries/getCollections";
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
};

export { Mutation, Query };
