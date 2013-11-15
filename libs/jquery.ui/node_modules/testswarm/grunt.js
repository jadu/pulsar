module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: "<json:package.json>",
		lint: {
			files: ["grunt.js", "lib/**/*.js", "sample-test.js"]
		},
		jshint: {
			options: grunt.file.readJSON( ".jshintrc" )
		}
	});

	grunt.registerTask( "default", "lint" );
};
