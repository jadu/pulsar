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
        files: '**/*.scss',
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
      all: ['javascripts/**/*.js']
    },

    uglify: {
      concat: {
        options: {
          banner: '<%= pkg.banner %>',
          beautify: true
        },
        files: {
          'dist/js/<%= pkg.name %>.js': ['javascripts/**/*.js']
        }
      },
      minify: {
        options: {
          banner: '<%= pkg.banner %>',
          compress: true,
          report: 'min'
        },
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['javascripts/**/*.js']
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
          'libs/*', 
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
          mainConfigFile: 'javascripts/main.js',
          // optimize: 'none',
          out: 'dist/js/pulsar.min.js',
          paths: {
            'deck'              : '../javascripts/deck',
            'dropdown'          : '../javascripts/dropdown',
            'flash'             : '../javascripts/flash',
            'highcharts'        : '../libs/highcharts/highcharts',
            'highcharts-theme'  : '../javascripts/highcharts-theme',
            'highlightjs'       : '../libs/highlightjs/highlight.pack',
            'jquery'            : '../libs/jquery/jquery',
            'jquery-mousewheel' : '../libs/jquery-mousewheel/jquery.mousewheel',
            'modal'             : '../javascripts/modal',
            'navigation'        : '../javascripts/navigation',
            'order'             : '../libs/order/index',
            'pulsar'            : '../javascripts/pulsar',
            'sticky'            : '../libs/sticky/jquery.sticky',
            'tab'               : '../javascripts/tab',
            'tooltip'           : '../javascripts/tooltip',
            'vague'             : '../libs/Vague.js/Vague'
          }
        }
      }
    }

  });

  grunt.config.set('leadingIndent.indentation', 'spaces');
  grunt.config.set('leadingIndent.files', {
    src : [
      'javascripts/*.js',
      'css/*.css', 
      'stylesheets/*.scss',
      'tests/**/*.php',
      'views/**/*.twig'
    ]
  });

  grunt.registerTask('default', ['php']);

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