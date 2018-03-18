require('./gulp/tasks/styles')
require('./gulp/tasks/watch')
require('./gulp/tasks/scripts')
require('./gulp/tasks/modernizr')
require('./gulp/tasks/build')

// init dev build
var gulp = require('gulp')
gulp.start('cssInject')
gulp.start('scriptsRefresh')
