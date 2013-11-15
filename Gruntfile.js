module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    php: {
      dev: {
        options: {
          bin: '/usr/bin/php', // Mavericks
          // bin: '/usr/local/php5/bin/php', // Mountain Lion (See http://php-osx.liip.ch for PHP 5.4.0+)
          keepalive: true,
          open: true
        }
      }
    },

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
          style: 'compressed'
        },
        files: {
          'css/<%= pkg.name %>.css': 'stylesheets/pulsar.scss',
          'css/<%= pkg.name %>-ie7.css': 'stylesheets/pulsar-ie7.scss',
          'css/<%= pkg.name %>-ie8.css': 'stylesheets/pulsar-ie8.scss',
          'css/<%= pkg.name %>-ie9.css': 'stylesheets/pulsar-ie9.scss'
        }
      },
      dist: {
        options: {
          banner: '<%= pkg.banner %>',
          style: 'compressed'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'stylesheets/pulsar.scss',
          'dist/css/<%= pkg.name %>-ie7.css': 'stylesheets/pulsar-ie7.scss',
          'dist/css/<%= pkg.name %>-ie8.css': 'stylesheets/pulsar-ie8.scss',
          'dist/css/<%= pkg.name %>-ie9.css': 'stylesheets/pulsar-ie9.scss'
        }
      }
    },

    watch: {
      css: {
        files: 'stylesheets/*.scss',
        tasks: ['sass:dev'],
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
      dist: {
        src: [
          'libs/**/*', 
          'fonts/**/*', 
          'images/*', 
          'docs/**/', 
          'docs/**/*.md', 
          'docs/images/*', 
          '!docs/**/*.php'
        ],
        dest: 'dist/'
      },
      readme: {
        src: 'docs/01_Getting_started/01_Installation.md',
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
        files: ['package.json', 'composer.json', 'VERSION'],
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
      updateNpm: {
        cmd: 'sudo npm install'
      }
    },

    requirejs: {
      dist: {
        options: {
          name: 'main',
          mainConfigFile: 'js/main.js',
          // optimize: 'none',
          out: 'dist/js/pulsar.min.js',
          paths: {
            'daterange'         : '../libs/bootstrap-daterangepicker/daterangepicker',
            'deck'              : '../js/deck',
            'dropdown'          : '../js/dropdown',
            'flash'             : '../js/flash',
            'highcharts'        : '../libs/highcharts/highcharts',
            'highcharts-mono'   : '../js/highcharts-mono',
            'highcharts-theme'  : '../js/highcharts-theme',
            'highlightjs'       : '../libs/highlightjs/highlight.pack',
            'jquery'            : '../libs/jquery/jquery',
            'jquery-mousewheel' : '../libs/jquery-mousewheel/jquery.mousewheel',
            'modal'             : '../js/modal',
            'moment'            : '../libs/moment/moment',
            'navigation'        : '../js/navigation',
            'order'             : '../libs/order/index',
            'popover'           : '../js/popover',
            'pulsar'            : '../js/pulsar',
            'sparkline'         : '../libs/sparkline/index',
            'sticky'            : '../libs/sticky/jquery.sticky',
            'tab'               : '../js/tab',
            'tooltip'           : '../js/tooltip',
            'vague'             : '../libs/Vague.js/Vague'
          }
        }
      }
    },

    concurrent: {
      dev: ['watch', 'php'],
      options: {
        logConcurrentOutput: true
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

  grunt.registerTask('default', ['concurrent:dev']);

  grunt.registerTask('build', [
    'asciify', 
    'phpunit', 
    'leadingIndent:files', 
    'clean:dist', 
    'sass:dist',
    'requirejs',
    'copy:dist',
    'copy:readme'
  ]);

  grunt.registerTask('pre-commit', [
    'asciify', 
    'phpunit', 
    'leadingIndent:files',
    'copy:readme'
  ]);

  grunt.registerTask('release', [
    'build',
    'bump'
  ]);

  grunt.registerTask('smoketest', [
    'clean:smoketest',
    'exec:phantomcss'
  ]);

  grunt.registerTask('update', [
    'exec:updateComposer',
    'exec:updateBrew',
    'exec:updateBower',
    'exec:updateNpm'
  ]);

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};