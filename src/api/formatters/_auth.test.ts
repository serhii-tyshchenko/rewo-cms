import { formatAuthResponse } from './_auth';

describe('(Function) formatAuthResponse', () => {
  it('should format auth response', () => {
    const response = {
      avatar_urls: {
        '96': 'avatar-url',
      },
      locale: 'en-US',
      token: 'token',
      user_display_name: 'display name',
      user_email: 'test@mail.com',
      user_nicename: 'nicename',
    };
    const expectedOutput = {
      avatar: 'avatar-url',
      displayName: 'display name',
      email: 'test@mail.com',
      locale: 'en-US',
      name: 'nicename',
      token: 'token',
    };
    expect(formatAuthResponse(response)).toEqual(expectedOutput);
  });
});
