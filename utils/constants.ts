import type { Role } from "./types/User";

export const loginRedirects: Record<Role, string> = {
  admin: "/a",
  user: "/u",
};
