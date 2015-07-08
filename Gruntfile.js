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
					'build/css/main.css' : 'build/src/style.scss'
				}
			}
		},

		imagemin : {
			dist : {
				options : {
					optimizationLevel : 3,
				},
				files : [{
					expand: true,
					cwd : 'src/',
					src : ['images/*.*'],
					dest : 'build/'
				}]
			}
		},

		watch : {
			css : {
				files : 'src/sass/**',
				tasks : ['sass'],
				options : {
					livereload : true
				}
			},
			images : {
				files : 'src/images/**',
				tasks : ['imagemin']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'imagemin']);
	grunt.registerTask('update', ['connect', 'watch']);
	grunt.registerTask('seer', ['sass', 'imagemin', 'connect', 'watch']);

	
}