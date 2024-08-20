export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Role = "user" | "admin";
