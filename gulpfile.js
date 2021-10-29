const path = require("path");
const { src, watch, dest } = require("gulp");
const less = require("gulp-less");
const if_ = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");

console.log(process.argv);
const with_sourcemaps = () => !!process.env.DEBUG;
const renamer = path => {
  if (process.argv[3]) {
    path.basename = process.argv[3].slice(1);
  }
  return path;
};

const build = () =>
  src(__dirname + "/ckanext/data_depositario/fanstatic/less/main.less")
    .pipe(if_(with_sourcemaps(), sourcemaps.init()))
    .pipe(less())
    .pipe(if_(with_sourcemaps(), sourcemaps.write()))
    .pipe(rename(renamer))
    .pipe(dest(__dirname + "/ckanext/data_depositario/public/styles/"));

const watchSource = () =>
  watch(
    __dirname + "/ckanext/data_depositario/fanstatic/less/**/*.less",
    { ignoreInitial: false },
    build
  );

exports.build = build;
exports.watch = watchSource;
