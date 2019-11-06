const path = require('path');

module.exports = {
    entry: './client/App.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    devServer: {
        publicPath: '/build/',
        proxy: {
            '/lists/**': 'http://localhost:3000',
            '/items/**': 'http://localhost:3000',
        },
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    }
                }
            },
        ],
    },
}