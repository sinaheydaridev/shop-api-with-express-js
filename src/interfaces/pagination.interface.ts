export type PaginationQuery = {
  page: string;
  limit: string;
};

export interface PaginationInfo extends PaginationQuery {
  count: number;
  totalPages: number;
}

export interface Pagination<T> {
  items: T;
  pagination: PaginationInfo;
}
