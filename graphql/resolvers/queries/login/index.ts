import { LoginPayload } from "./login.model";

const login = (_, { username, password }: LoginPayload) => {
  console.log("login called");
};

export default login;
