import * as api from '@api';
import { formatAuthResponse } from '@api/formatters';
import { extractError, hasError } from '@api/utils';

import { ERROR_MESSAGE, USER_ROLE } from '@constants';

import {
  actionApiRequestEnded,
  actionApiRequestStarted,
} from '../action-creators';
import { LOG_IN, LOG_OUT } from '../action-types';
import { doAddErrorNotification } from './_notifications';

const actionLogIn = (response) => ({
  type: LOG_IN,
  payload: formatAuthResponse(response),
});

export const doLogIn =
  (username: string, password: string) => async (dispatch) => {
    dispatch(actionApiRequestStarted());
    try {
      const logInresponse = await api.logIn(username, password);
      if (hasError(logInresponse)) {
        throw logInresponse;
      }

      const userRoleResponse = await api.getUserRole(logInresponse.token);
      if (hasError(userRoleResponse)) {
        throw userRoleResponse;
      }

      if (!userRoleResponse.roles.includes(USER_ROLE.ADMINISTRATOR)) {
        throw new Error(ERROR_MESSAGE.UNAUTHORIZED);
      }

      dispatch(actionLogIn(logInresponse));
    } catch (error) {
      dispatch(doAddErrorNotification(extractError(error as Error)));
    } finally {
      dispatch(actionApiRequestEnded());
    }
  };

export const doLogOut = () => ({ type: LOG_OUT });
