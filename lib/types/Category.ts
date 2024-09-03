export type Category = {
  id: number;
  name: string;
  type: Type;
  createdAt: Date;
  updatedAt: Date;
};

export enum Type {
  INCOME = "income",
  EXPENSE = "expense",
}

export type AdminCreateCategoryForm = Pick<Category, "name" | "type">;
export type AdminUpdateCategoryForm = AdminCreateCategoryForm;
