import { TFunction } from 'i18next';

export const getWelcomeMessage = (t: TFunction, name: string) => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    return t('goodMorningUser', { name });
  }
  if (hour >= 12 && hour < 18) {
    return t('goodAfternoonUser', { name });
  }
  if (hour >= 18 || hour < 23) {
    return t('goodEveningUser', { name });
  }
  return t('goodNightUser', { name });
};
