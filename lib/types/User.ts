export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export type AdminCreateUserForm = Pick<User, "name" | "email" | "role">;
export type AdminUpdateUserForm = AdminCreateUserForm;
