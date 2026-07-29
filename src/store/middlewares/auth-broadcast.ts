/**
 * Redux middleware for syncing login/logout actions across browser tabs
 * Uses BroadcastChannel API to communicate between tabs
 */
import { Middleware } from 'redux';

import { broadcastChannelService } from '@services/broadcast-channel-service/broadcast-channel-service';

import { LOG_IN, LOG_OUT } from '../action-types';

/**
 * Flag to track if we're currently processing a broadcast message
 * This prevents re-broadcasting the same action back to other tabs
 */
let isProcessingBroadcast = false;

export const authBroadcastMiddleware: Middleware = (store) => {
  // Subscribe to incoming broadcasts when middleware initializes
  broadcastChannelService.subscribe((message) => {
    // Only dispatch if it's a login or logout action
    if (message.type === LOG_IN || message.type === LOG_OUT) {
      isProcessingBroadcast = true;
      store.dispatch({
        type: message.type,
        payload: message.payload,
      });
      isProcessingBroadcast = false;
    }
  });

  return (next) => (action) => {
    // Process the action through the reducer
    const result = next(action);

    // Broadcast login/logout actions to other tabs, but not if we just received a broadcast
    if (
      (action.type === LOG_IN || action.type === LOG_OUT) &&
      !isProcessingBroadcast
    ) {
      broadcastChannelService.broadcast({
        type: action.type,
        payload: action.payload,
      });
    }

    return result;
  };
};
