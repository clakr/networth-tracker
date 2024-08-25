import type { Role } from "./types/User";

export const authRedirects: Record<Role, string> = {
  admin: "/a",
  user: "/u",
};
