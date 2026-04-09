export const formatAuthResponse = (response) => ({
  avatar: response?.avatar_urls?.['96'] ?? null,
  displayName: response?.user_display_name,
  email: response?.user_email,
  locale: response?.locale ?? 'en-US',
  name: response?.user_nicename,
  token: response?.token,
});
