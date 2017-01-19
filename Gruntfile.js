module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg:     grunt.file.readJSON('package.json'),
        pulsar:  grunt.file.readJSON('pulsar.json'),
        secrets: grunt.file.readJSON('secrets.json'),

        mailgun: {
            cmsDetail: {
                options: {
                    key: '<%= secrets.mailgun.api_key %>',
                    sender: '<%= secrets.mailgun.sender %>',
                    recipient: '<%= secrets.mailgun.recipient %>',
                    subject: 'Test Pulsar Email Template',
                    preventThreading: true,
                    hideRecipient: true
                },
                src: ['emails/dist/*.html']
            }
        },

        browserify: {
            dev: {
                files: {
                    'dist/js/bundle.js': ['js/index.js'],
                    'dist/js/test.js': ['tests/js/web/index.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'pulsar'
                    }
                }
            },
            dist: {
                files: {
                    'dist/js/bundle.js': ['js/index.js'],
                    'dist/js/test.js': ['tests/js/web/index.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'pulsar'
                    },
                    transform: ['uglifyify']
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
                    outputStyle: 'nested',
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
            dist_modern: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    cwd:    'stylesheets/',
                    dest:   'dist/css/',
                    expand: true,
                    flatten: true,
                    ext:    '.css',
                    extDot: 'first',
                    src:    ['pulsar.scss']
                }]
            },
            dist_ie: {
                options: {
                    outputStyle: 'nested'
                },
                files: [{
                    cwd:    'stylesheets/',
                    dest:   'dist/css/',
                    expand: true,
                    flatten: true,
                    ext:    '.css',
                    extDot: 'first',
                    src:    'pulsar-ie*.scss'
                }]
            },
            email: {
                options: {
                    outputStyle: 'nested',
                    sourceMap: true
                },
                files: [{
                    cwd:    'emails/stylesheets/',
                    dest:   'emails/css/',
                    expand: true,
                    ext:    '.css',
                    extDot: 'first',
                    src:    '*.scss'
                }]
            }
        },

        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
                },
                expand: true,
                src:    'css/*.css'
            }
        },

        scsslint: {
            allFiles: [
                'stylesheets/*.scss',
            ],
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: true
            },
        },

        watch: {
            css: {
                files: ['stylesheets/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer', 'bless:css'],
                options: {
                    livereload: true,
                },
            },
            scsslint: {
                files: 'stylesheets/**/*.scss',
                tasks: ['scsslint']
            },
            emails: {
                files: ['emails/**/*'],
                tasks: ['emailBuilder']
            },
            js: {
                files: ['js/**/*.js', 'tests/js/**/*', 'package.json'],
                tasks: ['browserify']
            }
        },

        jshint: {
            options: {
            jshintrc: '.jshintrc'
            },
            all: ['js/**/*.js']
        },

        mocha: {
            test: {
                src: ['tests/**/*.html'],
                options: {
                    reporter: 'Nyan',
                    run: true
                }
            },
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
            files: [{
                    expand: true,
                    cwd: '',
                    src: [
                        'fonts/**/*',
                        'images/**/*',
                        'libs/**/*',
                        'views/pulsar/**/*',
                        'src/**/*'
                    ],
                    dest: 'dist/'
                }]
            }
        },

        clean: {
            dist: ['dist'],
            favicons: ['views/pulsar/components/favicons-*.html'],
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

        emailBuilder: {
            inline: {
                files : [{
                    expand: true,
                    flatten: true,
                    src: ['emails/src/**/*.html'],
                    dest: 'emails/dist/'
                }]
            },
            options: {
                encodeSpecialChars: true
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
            },
            wraithUpdate: {
                cmd: 'php tests/css/updateWraith.php'
            },
            wraithHistory: {
                cmd: 'wraith history wraith.yml'
            },
            wraithLatest: {
                cmd: 'wraith latest wraith.yml'
            },
            fixProximaNova: {
                cmd: 'git update-index --skip-worktree fonts/_config.fonts.scss'
            }
        },

        realFavicon: {
            options: {
                settings: {
                    scalingAlgorithm: 'Mitchell',
                    errorOnImageTooSmall: false
                }
            },
            cms: {
                src: 'images/favicons/src/favicon-cms.svg',
                dest: 'images/favicons/cms',
                options: {
                    iconsPath: '/jadu/bundles/pulsar/images/favicons/cms/',
                    html: [ 'views/pulsar/components/favicons-cms.html' ],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#ffffff',
                            margin: '14%'
                        },
                        desktopBrowser: {},
                        androidChrome: {
                            pictureAspect: 'backgroundAndMargin',
                            margin: '17%',
                            backgroundColor: '#ffffff',
                            themeColor: '#ffffff',
                            manifest: {
                                name: 'Continuum',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override'
                            }
                        },
                        windows: {
                            pictureAspect: 'whiteSilhouette',
                            backgroundColor: '#15a6d1',
                            onConflict: 'override'
                        }
                    }
                }
            },
            xfp: {
                src: 'images/favicons/src/favicon-xfp.svg',
                dest: 'images/favicons/xfp',
                options: {
                    iconsPath: '/images/favicons/xfp/',
                    html: [ 'views/pulsar/components/favicons-xfp.html' ],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#ffffff',
                            margin: '14%'
                        },
                        desktopBrowser: {},
                        androidChrome: {
                            pictureAspect: 'backgroundAndMargin',
                            margin: '17%',
                            backgroundColor: '#ffffff',
                            themeColor: '#ffffff',
                            manifest: {
                                name: 'Continuum',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override'
                            }
                        },
                        windows: {
                            pictureAspect: 'whiteSilhouette',
                            backgroundColor: '#80BA27',
                            onConflict: 'override'
                        }
                    }
                }
            },
            cxm: {
                src: 'images/favicons/src/favicon-cxm.svg',
                dest: 'images/favicons/cxm',
                options: {
                    iconsPath: '/images/favicons/cxm/',
                    html: [ 'views/pulsar/components/favicons-cxm.html' ],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#ffffff',
                            margin: '14%'
                        },
                        desktopBrowser: {},
                        androidChrome: {
                            pictureAspect: 'backgroundAndMargin',
                            margin: '17%',
                            backgroundColor: '#ffffff',
                            themeColor: '#ffffff',
                            manifest: {
                                name: 'Continuum',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override'
                            }
                        },
                        windows: {
                            pictureAspect: 'whiteSilhouette',
                            backgroundColor: '#54B9A9',
                            onConflict: 'override'
                        }
                    }
                }
            },
            cp: {
                src: 'images/favicons/src/favicon-cp.svg',
                dest: 'images/favicons/cp',
                options: {
                    iconsPath: '/images/favicons/cp/',
                    html: [ 'views/pulsar/components/favicons-cp.html' ],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#ffffff',
                            margin: '14%'
                        },
                        desktopBrowser: {},
                        androidChrome: {
                            pictureAspect: 'backgroundAndMargin',
                            margin: '17%',
                            backgroundColor: '#ffffff',
                            themeColor: '#ffffff',
                            manifest: {
                                name: 'Continuum',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override'
                            }
                        },
                        windows: {
                            pictureAspect: 'whiteSilhouette',
                            backgroundColor: '#DC5172',
                            onConflict: 'override'
                        }
                    }
                }
            }
        },

        bless: {
            css: {
                options: {
                    cacheBuster: true,
                    compress: true,
                    logCount: true
                },
                files: {
                    'css/pulsar-ie7.min.css': 'css/pulsar-ie7.css',
                    'css/pulsar-ie8.min.css': 'css/pulsar-ie8.css',
                    'css/pulsar-ie9.min.css': 'css/pulsar-ie9.css'
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'pulsar.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*']
                }]
            }
        },

        browserSync: {
            files: [
                'css/*',
                'dist/**/*',
                'images/**/*',
                'views/**/*'
            ],
            options: {
                proxy: 'http://192.168.13.37/index.php',
                reloadOnRestart: true,
                watchTask: true
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

    grunt.registerTask('default', [
        'copy',
        'scsslint',
        'sass:dev',
        'autoprefixer',
        'bless',
        'browserify',
        'browserSync',
        'watch',
        'email-build'
    ]);

    grunt.registerTask('post-merge', [
        'exec:fixProximaNova',
        'sass:dev',
        'browserify',
        'email-build'
    ]);

    grunt.registerTask('build', [
        'scsslint',
        'sass:dist_modern',
        'sass:dist_ie',
        'autoprefixer',
        'browserify:dist',
        'copy:dist',
        'emailBuilder',
        'realFavicon',
        'compress'
    ]);

    grunt.registerTask('deploy', [
        'sass:dist_modern',
        'sass:dist_ie',
        'autoprefixer',
        'browserify:dist',
        'copy:dist',
        'compress'
    ]);

    grunt.registerTask('favicons', [
        'clean:favicons',
        'realFavicon'
    ]);

    grunt.registerTask('email-build', [
        'sass:email',
        'emailBuilder'
    ]);

    grunt.registerTask('email-test', [
        'email-build',
        'mailgun'
    ]);

    grunt.registerTask('wraith', [
        'exec:wraithLatest'
    ]);

    grunt.registerTask('wraith-update', [
        'exec:wraithUpdate',
        'exec:wraithHistory'
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
