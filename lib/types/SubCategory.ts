import type { Model } from ".";
import type { Category } from "./Category";

export type SubCategory = Model & {
  name: string;
};

export type AdminCreateSubCategoryForm = Pick<SubCategory, "name"> & {
  categoryId: Category["id"];
};
export type AdminUpdateSubCategoryForm = AdminCreateSubCategoryForm;
