module.exports = function(grunt) {

	grunt.initConfig({
		
		connect : {
			server : {
				options : {
					port : 2208,
					open : {
						target : 'http://localhost:2208'
					}
				}
			}
		},

		sass : {
			dist : {
				options : {
					style : 'compact'
				},
				files : {
					'build/css/main.css' : 'src/sass/style.scss'
				}
			}
		},

		copy : {
			thirdparty : {
				expand : true,
				cwd : 'src/thirdparty',
				src : '**',
				dest  : 'build'
			}
		},

		imagemin : {
			dist : {
				expand : true,
				cwd : 'src/images/',
				src : '**/*.*',
				dest : 'build/images/'
			}
		},

		uglify : {
			dist : {
				files : {
					'build/js/main.min.js' : ['src/js/main.js']
				}
			},
			finish : {
				options : {
					compress : {
						drop_console : true
					}
				},
				files : {
					'build/js/main.min.js' : ['src/js/main.js']
				}
			}
		},

		watch : {
			options : {
				livereload: true
			},
			index : {
				files : ['index.html']
			},
			images : {
				files : ['src/images/**'],
				tasks : ['imagemin']
			},
			thirdparty : {
				files : ['src/thirdparty/**'],
				tasks : ['copy:thirdparty']
			},
			css : {
				files : ['src/sass/**'],
				tasks : ['sass']
			},
			js : {
				files : ['src/js/**'],
				tasks : ['uglify:dist']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'imagemin', 'copy', 'uglify:dist']);
	grunt.registerTask('update', ['connect', 'watch']);
	grunt.registerTask('finish', ['sass', 'imagemin', 'copy', 'uglify:finish']);
}