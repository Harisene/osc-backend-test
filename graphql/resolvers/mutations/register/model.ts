import { UserRole } from "../../../../models/common.model";

export interface RegisterPayload {
  username: string;
  password: string;
  role?: UserRole;
}
