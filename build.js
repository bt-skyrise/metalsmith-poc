const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const static = require('metalsmith-static');
const inPlace = require('metalsmith-in-place');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

metalsmith(__dirname)
    .metadata({
        foo: 'bar'
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(watch({
        livereload: true,
        paths: {
            "${source}/**/*": true,
            "layouts/**/*": "**/*"
        }
    }))
    .use(serve())
    .use(static({
        src: "node_modules/bootstrap-sass/assets/fonts/bootstrap",
        dest: "fonts/bootstrap"
    }))
    .use(inPlace())
    .use(sass())
    .use(layouts('handlebars'))
    .build(err => {
        if (err) {
            throw err;
        } else {
            console.log('Build succeeded');
        }
    });