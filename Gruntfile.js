module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg:    grunt.file.readJSON('package.json'),
    pulsar: grunt.file.readJSON('pulsar.json'),

    phpunit: {
      classes: {
          dir: 'tests/unit/'
      },
      options: {
          bin: 'vendor/bin/phpunit',
          bootstrap: 'tests/unit/bootstrap.php',
          colors: true
      }
    },

    sass: {
      dev: {
        options: {
          style: 'nested',
          sourceMap: true
        },
        files: [{
          cwd:    'stylesheets/',
          dest:   'css/',
          expand: true,
          ext:    '.css',
          extDot: 'first',
          src:    '*.scss'
        }]
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          cwd:    'stylesheets/',
          dest:   'css/',
          expand: true,
          flatten: true,
          ext:    '.css',
          extDot: 'first',
          src:    '*.scss'
        }]
      },
    },

    autoprefixer: {
      dev: {
        options: {
          browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
        },
        expand: true,
        src:    'css/*.css',
        dest:   'css/'
      }
    },

    watch: {
      css: {
        files: ['stylesheets/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer'],
        options: {
          livereload: true,
        },
      },
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['js/**/*.js']
    },

    uglify: {
      concat: {
        options: {
          banner: '<%= pkg.banner %>',
          beautify: true
        },
        files: {
          'dist/js/<%= pkg.name %>.js': ['js/**/*.js']
        }
      },
      minify: {
        options: {
          banner: '<%= pkg.banner %>',
          compress: true,
          report: 'min'
        },
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['js/**/*.js']
        }
      }
    },

    asciify: {
      banner:{
        text: '<%= pkg.name %>',
        options: {
          font: 'univers',
          log: true
        }
      },
    },

    copy: {
      readme: {
        src: 'docs/index.md',
        dest: 'README.md',
      }
    },

    clean: {
      dist: ['dist'],
      smoketest: ['tmp/failures/*']
    },

    bump: {
      options: {
        updateConfigs: ['pkg'],
        files: ['pulsar.json', 'package.json', 'composer.json', 'bower.json', 'VERSION'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        push: true,
        pushTo: 'origin'
      }
    },

    exec: {
      phantomcss: {
        cmd: 'phantomjs tests/css/testsuite.js'
      },
      updateComposer: {
        cmd: 'sudo php composer.phar update'
      },
      updateBrew: {
        cmd: 'brew update && brew upgrade'
      },
      updateBower: {
        cmd: 'bower update'
      },
      updateGems: {
        cmd: 'sudo gem update'
      },
      updateNpm: {
        cmd: 'sudo npm install'
      }
    }

  });

  grunt.config.set('leadingIndent.indentation', 'spaces');
  grunt.config.set('leadingIndent.files', {
    src : [
      'docs/**/*.md',
      'docs/**/*.php',
      'css/**/*',
      'js/**/*',
      'lexicon/**/*',
      'src/**/*',
      'stylesheets/**/*',
      'tests/**/*',
      'views/**/*'
    ]
  });

 grunt.registerTask('default', ['sass:dev', 'watch']);

 grunt.registerTask('pre-commit', [
    'asciify',
    'phpunit',
    // 'leadingIndent:files',
    'copy:readme'
  ]);

  grunt.registerTask('smoketest', [
    'clean:smoketest',
    'exec:phantomcss'
  ]);

  grunt.registerTask('update', [
    'exec:updateComposer',
    'exec:updateBrew',
    'exec:updateBower',
    'exec:updateGems',
    'exec:updateNpm'
  ]);

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
