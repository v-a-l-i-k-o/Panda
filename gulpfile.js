'use strict';

//* Присваиваем каждой переменной
//  вызов соответствующего плагина. 

var autoprefixer = require('gulp-autoprefixer'), 
       minifycss = require('gulp-minify-css'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
         changed = require('gulp-changed'),
         plumber = require('gulp-plumber'), 
          uglify = require('gulp-uglify'),
          rigger = require('gulp-rigger'),
          rimraf = require('rimraf'),
          rename = require('gulp-rename'),
            gulp = require('gulp'),
            less = require('gulp-less'),
              bs = require("browser-sync").create();

//* Записываем в переменную пути к нашим файлам.

var path = {
    build: {
        js_libs: 'build/js/libs/',
          fonts: 'build/fonts/',
           html: 'build/',
            img: 'build/img/',
            css: 'build/css/',
             js: 'build/js/'
    },

    src: {
        js_plugins: 'src/js/plugins.js',
           js_libs: 'bower_components/*.js',
           js_main: 'src/js/main.js',
            styles: 'src/styles/main.less',
             fonts: 'src/fonts/**/*.*',
              html: 'src/*.html',
               img: 'src/img/**/*.*'
    },

    watch: {
        styles: 'src/styles/**/*.less',
         fonts: 'src/fonts/**/*.*',
          html: 'src/**/*.html',
           img: 'src/img/**/*.*',
            js: 'src/js/**/*.js'
    },

    clean: './build'
};

//* Записываем в переменную настройки локального сервера.

var config = {
    server: {
        baseDir: "./build"
    },
    logPrefix: "Frontend_Fellow",
       tunnel: true,
         port: 1988,
         host: 'localhost'
};

//* Создаём задачу для HTML.

gulp.task('html:build', function () {
    gulp.src(path.src.html)                  // Выберем html файлы по нужному пути
        .pipe(changed(path.build.html))      // Получаем файлы и пропускаем только изменившиеся
        .pipe(rigger())                      // Прогоним через rigger
        .pipe(gulp.dest(path.build.html))    // Выплюнем файлы в папку build
        .pipe(bs.reload({stream: true}));    // Перезагрузим локальный сервер
});

//* Создаём задачу для SCRIPTS.

gulp.task('js:build', function () {
    gulp.src(path.src.js_libs)               // Выберем libs файлы
        .pipe(changed(path.build.js_libs))   // Получаем файлы и пропускаем только изменившиеся
        .pipe(gulp.dest(path.build.js_libs)) // Выплюнем файлы в build
    gulp.src(path.src.js_plugins)            // Выберем plugins файл
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(changed(path.build.js))        // Получаем файл и пропускаем если он изменялся
        .pipe(rigger())                      // Прогоним через rigger
        .pipe(gulp.dest(path.build.js))      // Выплюнем готовый файл в build
    gulp.src(path.src.js_main)               // Выберем main файл
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(rename('scripts.js'))          // Переименуем
        .pipe(gulp.dest(path.build.js))      // Выплюнем файл в build
        .pipe(bs.reload({stream: true}));    // Перезагрузим локальный сервер
});

//* Создаём задачу для STYLES.

gulp.task('styles:build', function () {
    gulp.src(path.src.styles)                // Выберем файл main.less
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(less())                        // Компилируем через препроцессор
        .pipe(rename('styles.css'))          // Переименуем
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 9'],
            cascade: false
        }))                                  // Добавим вендорные префиксы
        .pipe(gulp.dest(path.build.css))     // Выплюнем в build
        .pipe(minifycss())                   // Сожмём файл
        .pipe(rename({suffix: '.min'}))      // Переименуем
        .pipe(gulp.dest(path.build.css))     // Выплюнем в build
        .pipe(bs.reload({stream: true}));    // Перезагрузим локальный сервер
});

//* Создаём задачу для IMAGES.

gulp.task('img:build', function () {
    gulp.src(path.src.img)                   // Выберем картинки
        .pipe(changed(path.build.img))       // Получаем файлы и пропускаем только изменившиеся
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))                                  // Сожмём файлы
        .pipe(gulp.dest(path.build.img))     // Выплюнем в build
        .pipe(bs.reload({stream: true}));    // Перезагрузим локальный сервер
});

//* Создаём задачу для FONTS.

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)                 // Выберем шрифты
        .pipe(gulp.dest(path.build.fonts))   // Выплюнем в build
});

//* Создаём задачу для очистки проекта.

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//* Создаём задачу для инициализации
//  и запуска локального сервера.

gulp.task('localserver', function () {
    bs.init(config);
});

//* Создаём задачу для наблюдения за файлами.

gulp.task('watch', function (){
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.styles], ['styles:build']);
    gulp.watch([path.watch.js], ['js:build']);
    gulp.watch([path.watch.img], ['img:build']);
    gulp.watch([path.watch.fonts], ['fonts:build']);
});

//* Создаём задачу для наблюдения за файлами
//  после сборки и запуска локального сервера.

gulp.task('watch-localserver', ['build'], function () {
    gulp.start('localserver', 'watch');
});

//* Создаём общую задачу для последовательного
//  запуска следующих задач:
//  HTML, STYLES, SCRIPTS, IMAGES, FONTS.

gulp.task('build', ['html:build', 'styles:build', 'js:build', 'img:build', 'fonts:build']);

//* Создаём задачу для пересборки проекта.

gulp.task('rebuild-project', ['clean'], function () {
    gulp.start('build');
});

//* Создаём задачу для развёртывания рабочего окружения.

gulp.task('default', ['clean'], function () {
    gulp.start('build', 'localserver', 'watch');
});
