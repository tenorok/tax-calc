import { sh, help, Command } from './_utils.js';

function runTest(options, testPath = 'test/**') {
    const { skipts, reporter, watch } = options;

    const cmd = new Command('mocha');

    cmd.argument(testPath);

    cmd.env('NODE_ENV', 'testing');

    if (skipts) {
        cmd.env('TS_NODE_LOG_ERROR', 'true');
    }

    if (reporter) {
        cmd.option('--reporter', reporter);
    }

    if (watch) {
        cmd.option('--watch');
        cmd.option('--watch-files', testPath);
        cmd.option('--watch-files', 'src/**/*.ts');
    }

    sh(cmd.get());
}

export const test = {
    default(options, testPath) {
        runTest(options, testPath);
    },
};

help(test.default, 'Run unit tests', {
    params: ['path'],
    options: {
        reporter: 'Mocha reporter (npx mocha --list-reporters)',
        skipts: 'Logs TypeScript errors to stderr instead of throwing exceptions',
        watch: 'Run tests in watch mode',
    },
});
