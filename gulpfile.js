var gulp = require('gulp'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack'),
    path = require('path'),
    react = require('gulp-react');

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

function buildWebpack() {
    var webpackConfig = {
        cache: true,
        watch: true,
        resolve: {
            alias: {
                'react/addons': 'react/react-with-addons',
            },
            modulesDirectories: [
                __dirname + '/bower_components',
                __dirname + '/node_modules'
            ]
        },
        context: path.resolve(__dirname + '/'),
        entry: {
            main: __dirname + '/js/main.js',
            vendor: [
                'react/addons'
            ],
        },
        output: {
            path: path.resolve(__dirname + '/dist'),
            publicPath: path.resolve(__dirname + '/dist'),
            filename: '[name].js',
            chunkFilename: '[name]-[id].js'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
            new webpack.optimize.DedupePlugin(),
        ],
        module: {
            noParse: [
                /react/
            ],
            resolve: {
                extensions: ['', '.js']
            },
            loaders: []
        }
    };

    return gulp.src(__dirname + '/js/*.js')
               .pipe(gulpWebpack(webpackConfig))
               .pipe(gulp.dest(__dirname + '/dist'));
};

function buildJSX() {
    return gulp.src(__dirname + '/jsx/**/*.jsx')
               .pipe(react())
               .pipe(gulp.dest(__dirname + '/components'));
}

gulp.task('jsx', buildJSX);

gulp.task('watch', function () {
    buildWebpack();
    gulp.watch(__dirname + '/**/*.jsx', ['jsx']);
});
