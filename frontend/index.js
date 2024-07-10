import './i18n';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from "react-query";

import App from './App';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);