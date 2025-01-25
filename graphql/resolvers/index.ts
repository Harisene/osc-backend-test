import register from "./mutations/register";
import login from "./queries/login";

const Mutation = {
  register,
};

const Query = {
  login,
};

export { Mutation, Query };
