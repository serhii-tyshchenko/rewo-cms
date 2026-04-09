import { v4 as uuid } from 'uuid';

import { ONE_SECOND_IN_MS } from '@constants/_common';

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATIONS,
} from '../action-types';

interface IArgs {
  message: string;
  type: 'success' | 'error';
  delay?: number;
  autoclose?: boolean;
}

const addNotification = ({ message, type, delay, autoclose }: IArgs) => ({
  type: ADD_NOTIFICATION,
  payload: {
    id: uuid(),
    message,
    type,
    autoclose,
    delay,
  },
});

export const doAddSuccessNotification = (message: string, autoclose = true) =>
  addNotification({
    message,
    type: 'success',
    autoclose,
    delay: 3 * ONE_SECOND_IN_MS,
  });

export const doAddErrorNotification = (message: string, autoclose = false) =>
  addNotification({
    message,
    type: 'error',
    autoclose,
    delay: 5 * ONE_SECOND_IN_MS,
  });

export const doRemoveNotification = (id: string) => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
});

export const doRemoveNotifications = () => ({
  type: REMOVE_NOTIFICATIONS,
});
