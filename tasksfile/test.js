import { sh, help, Command } from './_utils.js';

function runTest(options, testPath = 'test/') {
    const { skipts, reporter } = options;

    const cmd = new Command('mocha');

    cmd.argument(testPath);

    cmd.env('TS_NODE_FILES', 'true');
    cmd.env('NODE_ENV', 'testing');

    if (skipts) {
        cmd.env('TS_NODE_LOG_ERROR', 'true');
    }

    if (reporter) {
        cmd.option('--reporter', reporter);
    }

    sh(cmd.get());
}

function runWatch(options, testPath = 'test/') {
    const { skipts } = options;
    const mask = testPath || 'test/**/*.js';
    const path = testPath || 'test/';

    const cmd = new Command('chokidar');

    if (skipts) {
        cmd.env('TS_NODE_LOG_ERROR', 'true');
    }

    cmd.argument('app/src/**/*.ts');
    cmd.argument(mask);

    cmd.option('-c', `task test --reporter=dot ${path}`);
    cmd.option('--initial');

    sh(cmd.get());
}

export const test = {
    default(options, testPath) {
        runTest(options, testPath);
    },

    watch(options, testPath) {
        runWatch(options, testPath);
    },
};

help(test.default, 'Run unit tests', {
    params: ['path'],
    options: {
        reporter: 'Mocha reporter (npx mocha --list-reporters)',
        skipts: 'Logs TypeScript errors to stderr instead of throwing exceptions',
    },
});
help(test.watch, 'Run unit tests on every changing', {
    params: ['path'],
    options: {
        skipts: 'Logs TypeScript errors to stderr instead of throwing exceptions',
    },
});
