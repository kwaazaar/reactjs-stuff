const path = require('path');

module.exports = {
    entry: ['babel-polyfill','./lib/components/Index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' }
        ]
    }
};