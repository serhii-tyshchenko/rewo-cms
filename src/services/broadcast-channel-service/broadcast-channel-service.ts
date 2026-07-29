const CHANNEL_NAME = 'rewo-cms-bc';

export type TBroadcastMessage = {
  type: `${Uppercase<string>}_${Uppercase<string>}`;
  payload?: unknown;
};

/**
 * BroadcastChannel Service for syncing actions across browser tabs
 * Broadcasts actions to all other tabs in the same browser
 */
class BroadcastChannelService {
  // eslint-disable-next-line no-use-before-define
  private static instance: BroadcastChannelService | null = null;

  private listeners: Set<(message: TBroadcastMessage) => void> = new Set();

  private channel: BroadcastChannel | null = null;

  constructor() {
    if (BroadcastChannelService.instance) {
      throw new Error('BroadcastChannelService can only be instantiated once.');
    }

    this.channel = new BroadcastChannel(CHANNEL_NAME);
    this.channel.addEventListener(
      'message',
      (event: MessageEvent<TBroadcastMessage>) =>
        this.listeners.forEach((listener) => listener(event.data)),
    );

    BroadcastChannelService.instance = this;
  }

  /**
   * Broadcast an action
   */
  broadcast({ type, payload }: TBroadcastMessage): void {
    this.channel?.postMessage({
      type,
      payload,
    });
  }

  /**
   * Subscribe to broadcasts from other tabs
   * Returns an unsubscribe function
   */
  subscribe(callback: (message: TBroadcastMessage) => void): () => void {
    this.listeners.add(callback);

    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Close the BroadcastChannel and clear listeners
   */
  close(): void {
    this.channel?.close();
    this.listeners.clear();
  }
}

export const broadcastChannelService = new BroadcastChannelService();
