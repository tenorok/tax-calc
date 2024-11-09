import { sh, help, Command } from './_utils.js';

function runStart() {
    const tailwind = new Command('tailwindcss', {
        optionKeyValSep: ' ',
    });
    tailwind.option('-i', './src/public/index.css');
    tailwind.option('-o', './src/public/dist/index.css');
    tailwind.option('--watch');

    // Запускаем tailwind в фоне.
    sh(tailwind.get(), { async: true });

    const vite = new Command('vite');
    sh(vite.get());
}

export const start = {
    default() {
        runStart();
    },
};

help(start.default, 'Start application in development mode');
