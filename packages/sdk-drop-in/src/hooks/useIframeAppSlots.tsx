import { useCallback, useState } from 'react';
import { useSyncExternalStore } from 'react';

import { IframeAppManager } from '@/lib/IframeClassManager';

export const useMoniteIframeAppSlots = () => {
  const [iframeAppManager] = useState(() => new IframeAppManager());
  const [token, setToken] = useState<{
    access_token: string;
    token_type: string;
    expires_in: number;
  } | null>(null);

  const subscribe = (onStoreChange: () => void) => {
    iframeAppManager.on('fetch-token', (payload) => {
      onStoreChange();
    });

    iframeAppManager.connectWithRetry();

    const handleConnectMessage = (event: MessageEvent) => {
      iframeAppManager.handleConnectMessage(event);

      // Handle token response from parent
      if (event.data.type === 'token-response') {
        setToken(event.data.token);
      }
    };

    window.addEventListener('message', handleConnectMessage);

    return () => {
      window.removeEventListener('message', handleConnectMessage);
    };
  };

  const getSnapshot = useCallback(() => {
    return iframeAppManager.state;
  }, [iframeAppManager.state]);

  const state = useSyncExternalStore(subscribe, getSnapshot);

  const fetchToken = useCallback(() => {
    return new Promise<{
      access_token: string;
      token_type: string;
      expires_in: number;
    }>((resolve) => {
      iframeAppManager.requestToken();

      const handleTokenResponse = (event: MessageEvent) => {
        if (event.data.type === 'token-response') {
          resolve(event.data.token);
          window.removeEventListener('message', handleTokenResponse);
        }
      };

      window.addEventListener('message', handleTokenResponse);
    });
  }, [iframeAppManager]);

  return { ...state, fetchToken, token };
};
