import {
  extractError,
  extractHeadersData,
  hasError,
  toQueryString,
} from './index';

describe('(Function) extractError', () => {
  it('should extract error message', () => {
    const response = {
      message: 'Error message',
      data: {
        message: 'Data message',
      },
      text: 'Text message',
      statusText: 'Status text',
    };

    expect(extractError(response)).toBe('Error message');
  });

  it('should return default message if no error message found', () => {
    const response = {};

    expect(extractError(response)).toBe('Something went wrong');
  });

  it('should extract data.message if message is missing', () => {
    const response = {
      data: {
        message: 'Data message',
      },
      text: 'Text message',
      statusText: 'Status text',
    };

    expect(extractError(response)).toBe('Data message');
  });

  it('should extract text if message and data.message are missing', () => {
    const response = {
      text: 'Text message',
      statusText: 'Status text',
    };

    expect(extractError(response)).toBe('Text message');
  });

  it('should extract statusText if others are missing', () => {
    const response = {
      statusText: 'Status text',
    };

    expect(extractError(response)).toBe('Status text');
  });
});

describe('(Function) extractHeadersData', () => {
  const createHeaders = (entries: Record<string, string>) =>
    ({
      get: (key: string) => entries[key] ?? null,
    }) as unknown as Headers;

  it('should extract total and pages from headers', () => {
    const headers = createHeaders({
      'X-WP-Total': '42',
      'X-WP-TotalPages': '7',
    });

    expect(extractHeadersData(headers)).toEqual({ total: 42, pages: 7 });
  });

  it('should return 0 for missing headers', () => {
    const headers = createHeaders({});

    expect(extractHeadersData(headers)).toEqual({ total: 0, pages: 0 });
  });

  it('should handle non-numeric header values gracefully', () => {
    const headers = createHeaders({
      'X-WP-Total': 'not-a-number',
      'X-WP-TotalPages': 'also-not-a-number',
    });

    expect(extractHeadersData(headers)).toEqual({ total: NaN, pages: NaN });
  });
});

describe('hasError', () => {
  it('should return true if status is greater than 400', () => {
    const response = {
      status: 500,
    };

    expect(hasError(response)).toBe(true);
  });

  it('should return true if data status is greater than 400', () => {
    const response = {
      data: {
        status: 500,
      },
    };

    expect(hasError(response)).toBe(true);
  });

  it('should return false if status is less than 400', () => {
    const response = {
      status: 200,
    };

    expect(hasError(response)).toBe(false);
  });

  it('should return false if data status is less than 400', () => {
    const response = {
      data: {
        status: 200,
      },
    };

    expect(hasError(response)).toBe(false);
  });
});

describe('(Function) toQueryString', () => {
  it('should convert a simple object to a query string', () => {
    const params = { a: '1', b: '2' };
    expect(toQueryString(params)).toBe('a=1&b=2');
  });

  it('should handle empty objects', () => {
    expect(toQueryString({})).toBe('');
  });

  it('should encode special characters', () => {
    const params = { q: 'hello world', x: 'a&b=c' };
    expect(toQueryString(params)).toBe('q=hello+world&x=a%26b%3Dc');
  });

  it('should handle numbers and booleans', () => {
    const params = { n: 42, b: true, f: false };
    expect(toQueryString(params)).toBe('n=42&b=true&f=false');
  });

  it('should handle null values as "null"', () => {
    const params = { a: null, b: '2' };
    expect(toQueryString(params)).toBe('a=null&b=2');
  });
});
