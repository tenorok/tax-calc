export default {
    '!(docs/**/*)*.{js,jsx,ts,tsx,json,html,css,scss,md}': [
        'prettier --write',
        `eslint --config .eslintrc.json`,
        `madge --circular ./src`,
        `bash -c tsc -p tsconfig.json --incremental false --noEmit`,
    ],
};
