import { cli } from './tasksfile/_utils.js';
import { test } from './tasksfile/test.js';
import { start } from './tasksfile/start.js';
import { build } from './tasksfile/build.js';

cli({
    test,
    start,
    build,
});
