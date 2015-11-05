(function() {

    'use strict';

    var dist = './dist/';
    var source = './src/';
    var sourceApp = source + 'app/';
    var client = sourceApp + 'client/';

    module.exports = function() {

        var config = {
            client: client,
            dist: dist,
            distCss: [dist + '**/*.css'],
            distDevDataDirectory: dist + 'dev-data/',
            distHtml: [dist + '**/*.html'],
            distJavaScript: [dist + '**/*.js'],
            index: 'index.html',
            clientJavaScriptDirectory: client + 'js/',
            source: source,
            sourceApp: source + 'app/',
            sourceCss: [source + '**/*.css'],
            sourceDevData: [source + 'dev-data/**/*.json'],
            sourceHtml: [source + '**/*.html'],
            sourceJavaScript: [source + '**/*.js'],
            templateCache: {
                filename: 'templates.js',
                options: { //these aren't working for some reason; still defaulting to 'template'
                    module: 'app',
                    standAlone: false,
                    root: 'app/'
                }
            },
            views: client + 'views/**/*.html'
        };

        return config;
    };

})();
