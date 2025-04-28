// karma.conf.js
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            jasmine: {},
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        reporters: ['progress', 'kjhtml'],
        browsers: ['ChromeHeadless'],
        restartOnFileChange: true
    });
};
