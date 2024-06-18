import { sh as baseSh, cli, help } from 'tasksfile';

function sh(cmd, options = {}) {
    // @see https://github.com/pawelgalazka/tasksfile/issues/103
    baseSh(cmd, Object.assign({ nopipe: true }, options));
}

function shPipe(cmd, options = {}) {
    return baseSh(cmd, Object.assign({ stdio: 'pipe' }, options));
}

class Command {
    constructor(cmd) {
        this.cmd = [cmd];
        this.envMap = new Map();
        this.options = [];
    }

    env(name, value) {
        this.envMap.set(name, value);
    }

    option(name, value) {
        this.options.push([name, value]);
    }

    argument(value) {
        this.cmd.push(`"${value}"`);
    }

    get() {
        const cmd = [];
        for (const [name, value] of this.envMap) {
            cmd.push(`${name}="${value}"`);
        }

        cmd.push(...this.cmd);

        for (const [name, value] of this.options) {
            if (typeof value === 'undefined') {
                cmd.push(name);
            } else {
                cmd.push(`${name}="${value}"`);
            }
        }

        return cmd.join(' ');
    }
}

export { sh, shPipe, cli, help, Command };
