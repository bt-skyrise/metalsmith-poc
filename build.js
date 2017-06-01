const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const static = require('metalsmith-static');

Metalsmith(__dirname)
    .metadata({
        foo: 'bar'
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(static({
        src: "node_modules/bootstrap-sass/assets/fonts/bootstrap",
        dest: "fonts/bootstrap"
    }))
    .use(sass())
    .use(layouts('handlebars'))
    .build(err => {
        if (err) {
            throw err;
        } else {
            console.log('Build succeeded');
        }
    }); 