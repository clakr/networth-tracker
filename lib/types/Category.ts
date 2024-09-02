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
