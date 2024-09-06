import type { Model } from ".";

export type Category = Model & {
  name: string;
  type: Type;
};

export enum Type {
  INCOME = "income",
  EXPENSE = "expense",
}

export type AdminCreateCategoryForm = Pick<Category, "name" | "type">;
export type AdminUpdateCategoryForm = AdminCreateCategoryForm;
