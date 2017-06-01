const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const static = require('metalsmith-static');
const inPlace = require('metalsmith-in-place');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

const command = process.argv[2];
const development = command === 'development';

const metalsmith = Metalsmith(__dirname);

metalsmith.metadata({
    foo: 'bar',
    development: development
});

if (development) {

    const rebuildOnlyChangedFile = true;
    const rebuildAllFiles = "**/*";

    metalsmith.use(watch({
        livereload: true,
        paths: {
            "${source}/**/*": rebuildOnlyChangedFile,
            "layouts/**/*": rebuildAllFiles
        }
    }));
    
    metalsmith.use(serve());
}

metalsmith.use(static({
    src: "node_modules/bootstrap-sass/assets/fonts/bootstrap",
    dest: "fonts/bootstrap"
}));

metalsmith.use(sass());

metalsmith.use(inPlace());

metalsmith.use(layouts('handlebars'));
    
metalsmith.build(err => {
    if (err) {
        throw err;
    } else {
        console.log('Build succeeded');
    }
});