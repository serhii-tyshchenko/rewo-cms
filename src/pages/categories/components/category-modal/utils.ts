import { TFunction } from 'i18next';

import { TCategoryAction } from '../../types';

export const getModalLabels = (action: TCategoryAction, t: TFunction) => {
  switch (action) {
    case 'edit':
      return { modalTitle: t('editCategory'), confirmBtnTitle: t('save') };
    case 'add':
      return { modalTitle: t('addCategory'), confirmBtnTitle: t('add') };
    case 'clone':
      return { modalTitle: t('cloneCategory'), confirmBtnTitle: t('confirm') };
    default:
      return { modalTitle: t('editCategory'), confirmBtnTitle: t('save') };
  }
};

export const getValue = (name: string, value: string) => {
  if (name === 'parent') {
    return Number(value);
  }
  return value;
};
