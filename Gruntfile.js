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
			kick : {
				images : {
					expand: true,
					cwd : 'src',
					src : 'images/**/*',
					dest : 'dev'
				}
			}
		},
		imagemin : {
			goal : {
				files : [{
					expand: true,
					cwd : 'src/',
					src : ['images/**/*'],
					dest : 'build'
				}]
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
				vendor : {
					files : {
						"dev/vendor.js"
					}
				}
			}
		},

		browserSync : {
			kick : {
				bsFiles : {
					src : ['dev/**/*.css', 'dev/**/*.js', 'dev/*.html']
				},
				options : {
					watchTask: true,
					server : {
						baseDir : "./dev/"
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
						baseDir : "./build/"
					}
				}
			}
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
			},
			external : {
				files : ['src/external/**'],
				tasks : ['copy:external']
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


	grunt.registerTask('default', ['sass:kick', 'postcss:kick', 'copy', 'uglify:kick']);
	grunt.registerTask('dev', ['browserSync:build', 'watch']);
	grunt.registerTask('deploy', ['ftp-deploy:build']);
}
