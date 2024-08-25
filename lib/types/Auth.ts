import type { User } from "./User";

export type UserLoginForm = Pick<User, "email"> & { password: string };
export type UserRegisterForm = Pick<User, "name" | "email"> & {
  password: string;
  passwordConfirmation: string;
};
