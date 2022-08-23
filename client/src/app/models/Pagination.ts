export interface Pagination {
  currentPageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export class PagedResult<T> {
  items: T;
  pagination: Pagination;
}
