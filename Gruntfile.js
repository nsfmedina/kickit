module.exports = function(grunt) {

	grunt.initConfig({

		sass : {
			kick : {
				options : {
					outputStyle : 'expanded',
					precision: 4
				},
				files : {
					'dev/css/main.css' : 'src/scss/style.scss'
				}
			},
			goal : {
				options : {
					outputStyle: 'compressed',
					precision: 4
				},
				files : {
					'build/css/main.min.css' : 'src/scss/style.scss'
				}
			}
		},

		postcss : {
			options : {
				processors : [
					require('autoprefixer')({browsers: 'last 5 versions'}),
					// dangerous postcss plugin, indeed
					require("css-mqpacker")()
				]
			},
			kick : {
				src : 'dev/css/*.css'
			},
			goal : {
				src : 'build/css/*css'
			}
		},

		copy : {
			kickimages : {
				expand: true,
				cwd : 'src',
				src : 'images/**/*',
				dest : 'dev'
			},
			kickhtml : {
				expand : true,
				cwd : 'src',
				src : '**/*.html',
				dest : 'dev'
			},
			goal : {
				images : {
					expand: true,
					cwd : 'src',
					src : 'images/**/*',
					dest : 'build'
				},
				html : {
					expand : true,
					cwd : 'src',
					src : '**/*.html',
					dest : 'build'
				}
			}
		},

		uglify : {
			kick : {
				options : {
					beautify : true,
					mangle: false,
					compress : {
						sequences : false
					}
				},
				files : {
					'dev/js/main.js' : ['src/js/main.js']
				}
			},
			goal : {
				files : {
					'build/js/main.min.js' : ['src/js/main.js'] 
				}
			}
		},

		concat : {
			kick : {
				files : {
					"dev/js/vendor.js" : ["src/vendor/js/**/*.js"],
					"dev/css/vendor.css" : ["src/vendor/css/**/*.css"]
				}
			},
			goal : {
				files : {
					"build/js/vendor.js" : ["src/vendor/js/**/*.js"],
					"build/css/vendor.css" : ["src/vendor/css/**/*.css"]
				}
			},
		},

		browserSync : {
			kick : {
				bsFiles : {
					src : ['dev/**/*.css', 'dev/**/*.js', 'dev/*.html']
				},
				options : {
					watchTask: true,
					server : {
						baseDir : "./dev/",
						index: 'index.html'
					}
				}
			},
			goal : {
				bsFiles : {
					src : ['build/**/*.css', 'build/**/*.js', 'build/*.html']
				},
				options : {
					watchTask: true,
					server : {
						baseDir : "./build/",
						index: 'index.html'
					}
				}
			}
		},

		watch : {
			index : {
				files : ['src/**/*.html'],
				tasks : ['copy:kickhtml']
			},
			images : {
				files : ['src/images/**'],
				tasks : ['copy:kickimages']
			},
			scss : {
				files : ['src/scss/**/*.scss'],
				tasks : ['sass:kick', 'postcss:kick']
			},
			js : {
				files : ['src/js/*.js'],
				tasks : ['uglify:kick']
			},
			vendor : {
				files : ['src/vendor/css/**', 'src/vendor/js/**'],
				tasks : ['concat:kick']
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


	grunt.registerTask('default', function(){
		console.log('try kickin!');
		console.log('Use grunt kick to start working!');
	});
	grunt.registerTask('kick', ['sass:kick', 'postcss:kick', 'copy:kickimages', 'copy:kickhtml', 'uglify:kick', 'concat:kick', 'browserSync:kick', 'watch']);
	// grunt.registerTask('goal', ['browserSync:build', 'watch']);
}
