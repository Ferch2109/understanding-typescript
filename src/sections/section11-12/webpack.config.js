// We create this file since webpack is a tools that needs to be configured.

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts', // This indicates where is our main file.
    output: {
        // The file where will be all the app code.
        filename: 'bundle.js',
        // Where the previous file will be located.
        // resolve method allow us to do an absolute path to a certain folder
        // the special constant __dirname is available globally on a node js 
        // enviroment (webpack uses node js to execute our files).
        // In resume this construct an absolute path to the dist folder.
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],
    },
    // Tells webpack that there will be generated source maps
    // that should extract and wire up correctly to the bundle file.
    devtool: 'inline-source-map',
    module: {
        rules: [
            // This tells webpack that any ts file it finds should be handled by the
            // ts-loader. Excluding any file in the node-modules folder ofc.
            {
                //test files that matches the declared regular expression.
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    // Here we tell webpack wich file extentions adds to the imports files.
    // By default it looks out for JS files.
    resolve: {
        // It tells webpack to look for ts and js files.
        extensions: ['.ts', '.js']
    }
};