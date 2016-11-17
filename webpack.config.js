var webpack = require('webpack');

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/foundation.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery',
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Twitch: 'app/components/Twitch.jsx',
            Topbar: 'app/components/Topbar.jsx',
            Sidebar: 'app/components/Sidebar.jsx',
            Display: 'app/components/Display.jsx',
            twitchApi: 'app/api/twitchApi.jsx',
            applicationStyles: 'app/styles/app.scss'
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            loader: 'url-loader',
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            },
            exclude: /(node_modules|bower_components)/
        }]
    },
    // devtools: 'cheap-eval-source-map'
}
