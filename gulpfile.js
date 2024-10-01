const gulp = require('gulp') // Подключение Gulp
const sass = require('gulp-sass')(require('sass')); // Преобразование SASS в CSS
const rename = require('gulp-rename'); // Переименование файлов
const cleanCss = require('gulp-clean-css'); // Минификация CSS файлов (уменьшение размера)
const babel = require('gulp-babel') // Преобразование современного JavaScript в старый для совместимости
const uglify = require('gulp-uglify') // Минификация JavaScript файлов
const concat = require('gulp-concat'); // Объединение нескольких файлов в один
const sourceMap = require('gulp-sourcemaps'); // Карты исходного кода для отладки
const autoprefixer = require('gulp-autoprefixer'); // Добавление префиксов для кроссбраузерности CSS
const htmlmin = require('gulp-htmlmin'); // Минификация HTML файлов
const size = require('gulp-size'); // Показывает размер файлов
const webp = require('gulp-webp'); // Преобразование изображений в формат WebP
const postcss = require('gulp-postcss'); // PostCSS для работы с CSS через плагины
const autoprefixer2 = require('autoprefixer'); // PostCSS плагин для добавления автопрефиксов
const purgecss = require('gulp-purgecss') // Удаление неиспользуемого CSS

// Пути к исходным файлам и директориям
const paths = {
	html: {
		src: 'src/*.html', // Исходные HTML файлы
		dest: 'dist/', // Папка назначения для HTML
	},
	css: {
		src: 'src/scss/*.scss', // Исходные SCSS файлы
		dest: 'dist/css/' // Папка назначения для CSS
	},
	js: {
		src: 'src/js/*.js', // Исходные JavaScript файлы
		dest: 'dist/js/' // Папка назначения для JavaScript
	},
	images: {
		src: 'src/images/*.{jpg,jpeg,png,svg}', // Исходные изображения
		dest: 'dist/images/' // Папка назначения для изображений
	}
}

// Минификация HTML файлов
function html() {
	return gulp.src(paths.html.src)
		.pipe(htmlmin({
			collapseWhitespace: true // Удаление лишних пробелов
		}))
		.pipe(size({
			showFiles: true // Показ размера файла
		}))
		.pipe(gulp.dest(paths.html.dest)) // Сохранение минифицированных файлов
}

// Компиляция стилей
function css() {
	return gulp.src(paths.css.src)
		.pipe(sourceMap.init()) // Инициализация карт исходного кода
		.pipe(sass()) // Преобразование SASS в CSS
		.pipe(cleanCss()) // Минификация CSS
		.pipe(postcss([autoprefixer2()])) // Добавление автопрефиксов с PostCSS
		.pipe(rename({
			basename: 'main', // Базовое имя файла
			suffix: '.min' // Добавление суффикса .min
		}))
		.pipe(sourceMap.write('.')) // Запись карты исходного кода
		.pipe(size({
			showFiles: true // Показ размера файлов
		}))
		.pipe(gulp.dest(paths.css.dest)) // Сохранение скомпилированных стилей
}

// Компиляция JavaScript файлов
function js() {
	return gulp.src(paths.js.src)
		.pipe(sourceMap.init()) // Инициализация карт исходного кода
		.pipe(babel({
			presets: ['@babel/env'] // Преобразование JS с помощью Babel
		}))
		.pipe(uglify()) // Минификация JS
		.pipe(concat('main.min.js')) // Объединение всех JS файлов в один
		.pipe(sourceMap.write('.')) // Запись карты исходного кода
		.pipe(size({
			showFiles: true // Показ размера файлов
		}))
		.pipe(gulp.dest(paths.js.dest)) // Сохранение скомпилированного JS
}

// Задача для очистки CSS от неиспользуемых стилей
gulp.task('purge', () => {
	return gulp.src('dist/css/*.min.css')
		.pipe(purgecss({
			content: [paths.html.src], // Путь к HTML для анализа использования стилей
		}))
		.pipe(gulp.dest(paths.css.dest)); // Сохранение очищенных файлов
});

// Оптимизация изображений и преобразование в формат WebP
function images() {
	return gulp.src(paths.images.src)
		.pipe(webp()) // Преобразование в WebP
		.pipe(gulp.dest(paths.images.dest)); // Сохранение оптимизированных изображений
}

// Наблюдение за изменениями файлов
function watch() {
	gulp.watch(paths.css.src, css); // Следить за изменениями SCSS файлов
	gulp.watch(paths.html.src, html); // Следить за изменениями HTML файлов
	gulp.watch(paths.js.src, js); // Следить за изменениями JS файлов
	gulp.watch(paths.images.src, images); // Следить за изменениями изображений
}

// Основная задача сборки
const build = gulp.series(gulp.parallel(css, js, html, images), watch);

// Экспорт задач для использования в командной строке
exports.css = css;
exports.js = js;
exports.html = html;
exports.images = images;
exports.build = build;
exports.default = build;
