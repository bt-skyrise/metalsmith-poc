const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const inPlace = require('metalsmith-in-place');

Metalsmith(__dirname)
    .metadata({
        foo: 'bar'
    })
    .source('./src')
    .destination('./build')
    .clean(true)
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