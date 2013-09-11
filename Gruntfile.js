module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        
        php: {
            dist: {
                options: {
                    bin: '/usr/local/php5/bin/php', // See http://php-osx.liip.ch for PHP 5.4.0+ on OSX
                    keepalive: true,
                    open: true
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/pulsar.css': 'stylesheets/pulsar.scss',
                    'css/pulsar-ie7.css': 'stylesheets/pulsar-ie7.scss',
                    'css/pulsar-ie8.css': 'stylesheets/pulsar-ie8.scss',
                    'css/pulsar-ie9.css': 'stylesheets/pulsar-ie9.scss',
                    'css/markdown.css': 'stylesheets/markdown.scss',
                }
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['javascripts/**/*.js']
        }

    });

    grunt.config.set('leadingIndent.indentation', 'spaces');
    grunt.config.set('leadingIndent.jsFiles', {
        src : ['javascripts/*.js']
    });
    grunt.config.set('leadingIndent.cssFiles', {
        src : ['css/*.css', 'stylesheets/*.scss']
    });

    grunt.registerTask('default', ['php', 'sass']);
    grunt.registerTask('precommit', ['leadingIndent:jsFiles', 'leadingIndent:cssFiles']);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};