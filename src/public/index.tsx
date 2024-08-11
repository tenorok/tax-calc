import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Application } from './components/Application';

const domNode = document.getElementById('root');

if (domNode) {
    const root = createRoot(domNode);
    root.render(<Application />);
} else {
    window.addEventListener('DOMContentLoaded', () => {
        document.write('Ошибка шаблонизации...');
    });
}
