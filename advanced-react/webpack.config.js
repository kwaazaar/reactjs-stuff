const path = require('path');

module.exports = {
    resolve: {
        alias: {
            'state-api': path.resolve(__dirname, 'lib/state-api')
        }
    },
    entry: ['babel-polyfill','./lib/renderers/dom.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' }
        ]
    }
};