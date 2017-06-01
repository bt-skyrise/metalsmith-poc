const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const static = require('metalsmith-static');
const inPlace = require('metalsmith-in-place');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

const command = process.argv[2];
const development = command === 'watch';

const metalsmith = Metalsmith(__dirname)
    .metadata({
        foo: 'bar',
        development: development
    })
    .source('./src')
    .destination('./build')
    .clean(true);

if (development) {
    metalsmith
        .use(watch({
            livereload: true,
            paths: {
                "${source}/**/*": true,
                "layouts/**/*": "**/*"
            }
        }))
        .use(serve());
}

metalsmith
    .use(static({
        src: "node_modules/bootstrap-sass/assets/fonts/bootstrap",
        dest: "fonts/bootstrap"
    }))
    .use(sass())
    .use(inPlace())
    .use(layouts('handlebars'))
    .build(err => {
        if (err) {
            throw err;
        } else {
            console.log('Build succeeded');
        }
    });