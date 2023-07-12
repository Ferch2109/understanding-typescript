// We create this file since webpack is a tools that needs to be configured.

const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    // This is importart to indicates webpack to build the app for production.
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    //devtool: 'none', // In production we might not need it.
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    // Plugins are applied to the general workflow.
    plugins: [
        // This makes webpack to clean the content on the dist folder 
        // before fill it again.
        new CleanPlugin.CleanWebpackPlugin()
    ]
};