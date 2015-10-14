'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './src/';
        this.sourceApp = this.source + 'app/';
        this.client = this.sourceApp + 'client/'
        this.allJavaScript = [this.source + 'js/**/*.js'];
        this.allCss = [this.client + '**/*.css'];

    }
    return gulpConfig;
})();
module.exports = GulpConfig;