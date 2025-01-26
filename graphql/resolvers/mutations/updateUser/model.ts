import { UserRole } from "@models/common.model";

export interface UpdateUserPayload {
  id: string;
  role: UserRole;
}
