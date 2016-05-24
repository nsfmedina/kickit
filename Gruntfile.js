module.exports = function(grunt) {

	grunt.initConfig({

		sass : {
			build : {
				options : {
					outputStyle : 'compact'
				},
				files : {
					'build/css/main.css' : 'src/sass/style.scss'
				}
			}
		},

		copy : {
			images : {
				expand : true,
				cwd : 'src/images/',
				src : '**/*.*',
				dest : 'build/images/'
			},
			index : {
				cwd: 'src',
				src: [ 'src/*.html' ],
				dest: 'build',
				expand: true
			}
		},

		uglify : {
			build : {
				options : {
					beautify : true,
					mangle: false,
					compress : {
						sequences : false
					}
				},
				files : {
					'build/js/main.js' : ['src/js/main.js']
				}
			}
		},

		postcss : {
			options : {
				processors : [
					require('autoprefixer')({browsers: 'last 5 versions'}),
					require("css-mqpacker")()
				]
			},
			build : {
				src : 'build/css/*.css'
			}
		},

		browserSync : {
			build : {
				bsFiles : {
					src : ['build/**/*.css', 'build/**/*.js', 'build/*.html']
				},
				options : {
					watchTask: true,
					server : {
						baseDir : "./build/"
					}
				}
			},
		},

		watch : {
			index : {
				files : ['src/index.html'],
				tasks : ['copy:index']
			},
			images : {
				files : ['src/images/**'],
				tasks : ['copy:images']
			},
			css : {
				files : ['src/sass/*.scss'],
				tasks : ['sass:build', 'postcss:build']
			},
			js : {
				files : ['src/js/*.js'],
				tasks : ['uglify:build']
			}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-postcss');


	grunt.registerTask('default', ['sass:build', 'postcss:build', 'copy', 'uglify:build']);
	grunt.registerTask('dev', ['browserSync:build', 'watch']);
	grunt.registerTask('deploy', ['ftp-deploy:build']);
}
