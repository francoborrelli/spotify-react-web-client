export interface Pagination<T> {
  /** @description A link to the Web API endpoint returning the full result of the request */
  href: string;

  items: T[];

  /** @description The maximum number of items in the response (as set in the query or by default). */
  limit: number;

  /** @description The offset of the items returned (as set in the query or by default) */
  offset: number;

  /** @description URL to the previous page of items. ( null if none) */
  previous: string | null;

  /** @description URL to the next page of items. ( null if none) */
  next: string | null;

  /** @description The total number of items available to return.. */
  total: number;
}

export interface PaginationQueryParams {
  limit?: number;
  offset?: number;
}
