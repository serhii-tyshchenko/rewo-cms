export * from './_media';

export const extractHeadersData = (
  headers: Headers,
): {
  total: number;
  pages: number;
} => ({
  total: +(headers.get('X-WP-Total') ?? '0'),
  pages: +(headers.get('X-WP-TotalPages') ?? '0'),
});

interface ErrorResponse {
  data?: {
    message?: string;
  };
  text?: string;
  statusText?: string;
}

export const extractError = (error: Error & ErrorResponse): string =>
  error?.message ??
  error?.data?.message ??
  error?.text ??
  error?.statusText ??
  'Something went wrong';

interface HasErrorResponse {
  status?: number;
  data?: {
    status?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export const hasError = (response: HasErrorResponse): boolean =>
  (response.status ?? 0) >= 400 || (response.data?.status ?? 0) >= 400;

export const toQueryString = (queryParams: Record<string, any>): string =>
  new URLSearchParams(queryParams).toString();
