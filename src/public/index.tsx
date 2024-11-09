import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { Application } from './components/Application';

const domNode = document.getElementById('root');

if (domNode) {
    const root = createRoot(domNode);
    root.render(
        <Provider store={store}>
            <Application />
        </Provider>,
    );
} else {
    window.addEventListener('DOMContentLoaded', () => {
        document.write('Ошибка шаблонизации...');
    });
}
