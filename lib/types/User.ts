import type { Model } from ".";

export type User = Model & {
  name: string;
  email: string;
  role: Role;
  emailVerifiedAt: Date;
};

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export type AdminCreateUserForm = Pick<User, "name" | "email" | "role">;
export type AdminUpdateUserForm = AdminCreateUserForm;
