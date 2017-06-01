const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');

Metalsmith(__dirname)
    .metadata({
        foo: 'bar'
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(sass())
    .use(layouts({
        engine: 'handlebars'
    }))
    .build(err => {
        if (err) {
            throw err;
        } else {
            console.log('Build succeeded');
        }
    });