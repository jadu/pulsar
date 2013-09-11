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
  grunt.config.set('leadingIndent.files', {
    src : [
      'javascripts/*.js',
      'css/*.css', 
      'stylesheets/*.scss',
      'views/**/*.twig'
    ]
  });

  grunt.registerTask('default', ['php']);

  grunt.registerTask('precommit', [
    'leadingIndent:files', 
    'sass'
  ]);

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};