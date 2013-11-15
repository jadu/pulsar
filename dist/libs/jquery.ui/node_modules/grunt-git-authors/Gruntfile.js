module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-contrib-jshint" );

grunt.initConfig({
	jshint: {
		files: [ "Gruntfile.js", "tasks/**/*.js" ],
		options: {
			jshintrc: ".jshintrc"
		}
	}
});

grunt.registerTask( "default", "jshint" );
grunt.loadTasks("tasks");

};
