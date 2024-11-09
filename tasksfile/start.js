import chalk from 'chalk';
import { sh, shPipe, help, Command } from './_utils.js';

function runStart(options) {
    const { tunnel } = options;

    const PORT = '5173';

    const tailwind = new Command('tailwindcss', {
        optionKeyValSep: ' ',
    });
    tailwind.option('-i', './src/public/index.css');
    tailwind.option('-o', './src/public/dist/index.css');
    tailwind.option('--watch');

    // Запускаем tailwind в фоне.
    sh(tailwind.get(), { async: true });

    if (tunnel) {
        const ip = shPipe('curl https://loca.lt/mytunnelpassword', {
            silent: true,
        });
        console.log(
            '\nTunnel Password for this device:',
            chalk.yellow(ip),
            'for another device visit',
            chalk.yellow.underline('https://loca.lt/mytunnelpassword'),
            '\n',
        );

        const lt = new Command('lt');
        lt.option('--port', PORT);
        lt.option('--subdomain', 'tax-calc');
        lt.option('--open');
        sh(lt.get(), { async: true });
    }

    const vite = new Command('vite');
    vite.option('--port', PORT);
    vite.argument('dev');
    sh(vite.get());
}

export const start = {
    default(options) {
        runStart(options);
    },
};

help(start.default, 'Start application in development mode', {
    options: {
        tunnel: 'Create tunnel for local server',
    },
});
