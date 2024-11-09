import path from 'path';

export default {
    root: path.resolve(process.cwd(), 'src/public'),
    base: '',
    build: {
        outDir: path.resolve(process.cwd(), 'docs'),
        emptyOutDir: true,
    },
};
