import addCollection from "./mutations/addCollection";
import addCourse from "./mutations/addCourse";
import register from "./mutations/register";
import login from "./queries/login";

const Mutation = {
  register,
  addCollection,
  addCourse,
};

const Query = {
  login,
};

export { Mutation, Query };
