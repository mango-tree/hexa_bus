const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

const uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

module.exports = [
    {
        entry: {
            index: './src/js/index.js',
        },

        output: {
            path: __dirname + '/public/dist/js/',
            filename: '[name].bundle.js'
        },

        devServer: {
            inline: true,
            disableHostCheck: true,
            port: 7777,
            contentBase: __dirname + '/public/'
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react', 'stage-2']
                    }
                },
                { test: /\.css$/, loader: "style-loader!css-loader" },

            ]
        },
        plugins: [
            uglify
        ],
    },
    {
        entry: {
            index: './src/scss/index.scss',
        },

        output: {
            path: __dirname + '/public/dist/css',
            filename: '[name].css',
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }]
        },
        plugins: [
            extractSass
        ],
    }


];
