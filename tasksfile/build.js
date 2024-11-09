import { sh, help, Command } from './_utils.js';

function runBuild(options = {}) {
    const { open } = options;

    const vite = new Command('vite');
    vite.argument('build');
    sh(vite.get());

    if (open) {
        const server = new Command('http-server');
        server.option('-o', 'docs');
        sh(server.get());
    }
}

export const build = {
    default(options) {
        runBuild(options);
    },
};

help(build.default, 'Build application for production mode', {
    options: {
        open: 'Open http server with builded application',
    },
});
