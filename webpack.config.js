const _ = require('lodash');
const path = require('path');

const baseConfig = {
    entry: './lib/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    output: {
        path: __dirname,
        library: 'api-tebex',
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    target: 'web',
    devtool: 'source-map',
    mode: 'development'
};

module.exports = [
    _.merge({}, baseConfig, {
        output: {
            filename: 'node.js'
        },
        mode: 'production',
        devtool: undefined,
        target: 'node'
    }),
    _.merge({}, baseConfig, {
        output: {
            filename: 'node-dev.js'
        },
        target: 'node'
    })
];