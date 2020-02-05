import gulp from 'gulp'
import inject from 'gulp-inject-file'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

/* Compile sass to css task */
function cssBuildTask(){
	return gulp.src( 'assets/sass/**/*.*' )
		.pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( postcss( [ autoprefixer() ] ) )
        .pipe( gulp.dest( 'assets/css' ) );
}

/* Layout builder task */
function buildLayout(){
	return gulp.src( [ 'layout/pages/**/*.html' ] )
		.pipe( inject( { pattern: '<!--inject:<filename>-->' } ) )
        .pipe( gulp.dest( './public/' ) );
}

/* Assets builder task */
function buildAssets(){
	return gulp.src( [ 'assets/**/*.*' ] )		
		.pipe( gulp.dest( './public/assets' ) );
}

/* Watcher */
export function watch(){
	gulp.watch( 'layout/**/*.html', buildLayout );
	gulp.watch( 'assets/sass/**/*.sass', gulp.series( cssBuildTask, buildAssets ) );
    gulp.watch( 'assets/sass/**/*.scss', gulp.series( cssBuildTask, buildAssets ) );    
}

/* Default task */
export default gulp.series( buildLayout, cssBuildTask, buildAssets )