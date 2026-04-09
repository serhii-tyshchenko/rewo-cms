import './i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@components/common';

import { APP_ROOT } from '@constants';

import { NotificationService } from '@services/notification-service';

import store from '@store';

import App from './App';
import './index.scss';

const root = createRoot(APP_ROOT!);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
            <NotificationService />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
