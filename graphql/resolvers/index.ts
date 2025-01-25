import addCollection from "./mutations/addCollection";
import register from "./mutations/register";
import login from "./queries/login";

const Mutation = {
  register,
  addCollection,
};

const Query = {
  login,
};

export { Mutation, Query };
