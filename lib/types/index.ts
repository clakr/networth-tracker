export type Resource<T> = {
  data: T;
};

export type Paginate<T> = Resource<T> & {
  links: {
    first: Nullable<string>;
    last: Nullable<string>;
    prev: Nullable<string>;
    next: Nullable<string>;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{ url: Nullable<string>; label: string; active: boolean }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

export type Nullable<T> = T | null;

export type Models = "user" | "category";

export type Model = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
