// const Fiber = require('fibers');
const sass = require('dart-sass');

module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg:     grunt.file.readJSON('package.json'),
        pulsar:  grunt.file.readJSON('pulsar.json'),

        browserify: {
            dev: {
                files: {
                    'dist/js/bundle.js': ['js/index.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'pulsar',
                        debug: true
                    },
                    transform: [
                        ['babelify', { presets: ['es2015'] } ],
                        ['aliasify', { global: true }]
                    ]
                }
            },
            lexicon: {
                files: {
                    'dist/js/lexicon-bundle.js': ['js/lexicon/lexicon-index.js']
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [
                        ['babelify', { presets: ['es2015'] } ],
                        ['aliasify', { global: true }]
                    ]
                }
            },
            dist: {
                files: {
                    'dist/js/bundle.js': ['js/index.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'pulsar'
                    },
                    transform: [
                        ['babelify', { presets: ['es2015'] } ],
                        ['aliasify', { global: true }],
                        'uglifyify'
                    ]
                }
            },
            browserTests: {
                files: {
                    'dist/js/bundle.js': ['js/index.js'],
                    'dist/js/browser.test.js': ['tests/harness/browser.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'pulsar',
                        debug: true
                    },
                    transform: [
                        ['babelify', { presets: ['es2015'] } ],
                        ['aliasify', { global: true }],
                        ['require-globify']
                    ]
                }
            }
        },

        phpunit: {
            classes: {
                dir: 'tests/unit/'
            },
            options: {
                bin: 'php -d memory_limit=-1 ./vendor/bin/phpunit',
                bootstrap: 'tests/unit/bootstrap.php',
                colors: true
            }
        },

        sass: {
            dev: {
                options: {
                    implementation: sass,
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
                    implementation: sass,
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
            lexicon: {
                options: {
                    implementation: sass,
                    sourceMap: true
                },
                files: [{
                    cwd: 'stylesheets/lexicon/',
                    dest:   'css/',
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
                    browsers: ['last 2 versions', 'IE 10']
                },
                expand: true,
                src:    'css/*.css'
            }
        },

        watch: {
            css: {
                files: ['stylesheets/**/*.scss'],
                tasks: ['sass:dev', 'sass:lexicon', 'autoprefixer']
            },
            lexicon: {
                files: ['js/lexicon/**/*.js'],
                tasks: ['browserify:lexicon']
            },
            js: {
                files: ['js/**/*.js', 'package.json', '!js/lexicon/**/*'],
                tasks: ['browserify:dev']
            },
            tests: {
                files: ['tests/**/*.js'],
                tasks: ['browserify:browserTests']
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
                files: ['pulsar.json', 'package.json', 'VERSION'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: '%VERSION%',
                push: true,
                pushTo: 'origin'
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
                src: 'images/branding/jadu-central-logomark.svg',
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
                src: 'images/branding/jadu-central-logomark.svg',
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
                src: 'images/branding/jadu-connect-logomark.svg',
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
            },
            deployer: {
                src: 'images/favicons/src/favicon-deployer.svg',
                dest: 'images/favicons/deployer',
                options: {
                    iconsPath: '/images/favicons/deployer/',
                    html: [ 'views/pulsar/components/favicons-deployer.html' ],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#3d4796',
                            margin: '14%'
                        },
                        desktopBrowser: {},
                        androidChrome: {
                            pictureAspect: 'backgroundAndMargin',
                            margin: '17%',
                            backgroundColor: '#3d4796',
                            themeColor: '#3d4796',
                            manifest: {
                                name: 'Continuum',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override'
                            }
                        },
                        windows: {
                            pictureAspect: 'noChange',
                            backgroundColor: '#3d4796',
                            onConflict: 'override'
                        }
                    }
                }
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
                proxy: 'http://localhost:9000/app/app.php/lexicon',
                reloadOnRestart: true,
                watchTask: true
            }
	    }

    });

    grunt.config.set('leadingIndent.indentation', 'spaces');

    grunt.config.set('leadingIndent.files', {
        src : [
            'css/**/*',
            'js/**/*',
            'src/**/*',
            'stylesheets/**/*',
            'tests/**/*',
            'views/**/*'
        ]
    });

    grunt.registerTask('default', [
        'copy',
        'sass:dev',
        'sass:lexicon',
        'autoprefixer',
        'browserify:dev',
        'browserify:lexicon',
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('build', [
        'sass:dist',
        'autoprefixer',
        'browserify:dist'
    ]);

    grunt.registerTask('post-merge', [
        'sass:dev',
        'browserify'
    ]);

    grunt.registerTask('favicons', [
        'clean:favicons',
        'realFavicon'
    ]);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
