import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);