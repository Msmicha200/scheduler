const path = require('path');

module.exports = {
    chainWebpack: config => {
        config.plugin('html')
        .tap(args => {
            args[0].title = 'Scheduler';
            
            return args;
        });
    },
    pwa: {
        manifestOptions: {

        },
        iconPaths: {
            favicon32: './calendar.png',
        }
    }
}