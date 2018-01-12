module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: './.jshintrc',
                reporterOutput: ""
            },
            dist: ['js/calentim.js']
        },
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                src: ['js/calentim.js', 'js/jquery.hammer.js'],
                dest: 'build/js/calentim.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/calentim.min.css': 'css/calentim.scss'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({ browsers: ["last 3 versions", "ie > 9", "> 1%"] })
                ]
            },
            files: {
                expand: true,
                cwd: "build/css/",
                dest: "build/css/",
                src: ["calentim.min.css"]
            }
        },
        watch: {
            scripts: {
                files: ['js/calentim.js'],
                tasks: ['jshint', 'uglify']
            },
            styles: {
                files: ['css/*.scss'],
                tasks: ['sass', 'postcss']
            },
            docs: {
                files: ['readme.md', 'docs/includes/template.html'],
                tasks: 'markdown'
            },
            test: {
                files: ['js/calentim.js', 'tests/calentim.test.js', 'tests/calentim.inline.test.js'],
                tasks: ['jshint', 'uglify', 'karma:min']
            }
        },
        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: 'readme.md',
                    dest: 'docs/',
                    ext: '.html'
                }],
                options: {
                    template: 'docs/includes/template.html',
                    autoTemplate: true,
                    autoTemplateFormat: 'html'
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'output/calentim.zip'
                },
                files: [{
                    src: ['css/**'],
                    dest: '/',
                }, {
                    src: ['build/**'],
                    dest: '/'
                }, {
                    src: ['js/**'],
                    dest: '/'
                }, {
                    src: ['docs/**'],
                    dest: '/'
                }, {
                    src: ['gruntfile.js', '.gitignore', '.jshintrc', 'package.json', 'readme.md', 'CHANGELOG'],
                    dest: '/'
                },]
            },
            screenshots: {
                options: {
                    archive: 'output/screenshots.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'toolbox/screenshots/',
                    src: ['*.png', '!inline.png', '!thumbnail.png'],
                    dest: '/'
                }]
            },
        },
        copy: {
            main: {
                expand: true,
                cwd: 'toolbox',
                src: ['inline.png', 'thumbnail.png'],
                dest: 'output/',
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/css/*.min.css',
                        'build/js/*.min.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    },
                    startPath: "docs/single-test.html"
                }
            },
            docs: {
                bsFiles: {
                    src: [
                        'build/css/*.min.css',
                        'build/js/*.min.js',
                        'docs/**/*'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    },
                    startPath: "docs/readme.html",
                    notify: false
                }
            },
            test: {
                bsFiles: {
                    src: [
                        'tests/*.test.js',
                        'tests/output/calentim.html'
                    ]
                },
                options: {
                    watchTask: true,
                    online: false,
                    server: {
                        baseDir: "./"
                    },
                    startPath: "tests/output/calentim.html",
                    notify: false
                }
            },
            browsertest: {
                bsFiles: {
                    src: [
                        'tests/output/calentim.html'
                    ]
                },
                options: {
                    watchTask: false,
                    online: false,
                    browser: ["chrome", "firefox", "internet explorer"],
                    server: {
                        baseDir: "./"
                    },
                    startPath: "tests/output/calentim.html",
                    notify: false,
                    codeSync: false
                }
            }
        },
        karma: {
            min: {
                options: {
                    files: ['build/js/jquery.min.js', 'build/js/moment.min.js', 'js/jquery.hammer.js', 'js/calentim.js', 'tests/calentim.test.js', 'tests/calentim.inline.test.js'],
                    basePath: '',
                    frameworks: ['jasmine'],
                    reporters: ['progress', 'html', 'code'],
                    port: 9876,
                    colors: true,
                    //loggers: [{type: 'console'}],
                    autoWatch: true,
                    browsers: ['Chrome', 'ChromeMobile', 'IE', 'IE10', 'Firefox'],
                    singleRun: true,
                    customLaunchers: {
                        ChromeMobile: {
                            base: 'Chrome',
                            flags: ['--window-size=414,736', '--use-mobile-user-agent', '--user-agent="Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; DROIDX Build/VZW) AppleWebKit/530.17 (KHTML, like Gecko) Version/530.17 480X854 motorola DROIDX"']
                        },
                        IE10: {
                            base: 'IE',
                            'x-ua-compatible': 'IE=EmulateIE10'
                        }
                    },
                    htmlReporter: {
                        outputFile: 'tests/output/calentim.html',
                        pageTitle: 'calentim Behaviour Tests',
                        groupSuites: true,
                        useCompactStyle: true,
                        useLegacyStyle: true
                    },
                    codeReporter: {
                        outputPath: 'tests/output/code',
                        testFiles: ['tests/*.test.js'],
                        cssFiles: ['build/css/calentim.min.css']
                    }
                }
            },
            tz: {
                options: {
                    files: ['build/js/jquery.min.js', 'build/js/moment.min.js', 'js/jquery.hammer.js', 'js/calentim.js', 'tests/calentim.test.js', 'tests/calentim.inline.test.js'],
                    basePath: '',
                    frameworks: ['jasmine'],
                    reporters: ['dots'],
                    port: 9876,
                    colors: true,
                    //loggers: [{type: 'console'}],
                    autoWatch: true,
                    browsers: ['Chrome', 'Firefox', 'IE', 'IE10', 'ChromeMobile'],
                    singleRun: true,
                    customLaunchers: {
                        ChromeMobile: {
                            base: 'Chrome',
                            flags: ['--window-size=414,736', '--use-mobile-user-agent', '--user-agent="Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; DROIDX Build/VZW) AppleWebKit/530.17 (KHTML, like Gecko) Version/530.17 480X854 motorola DROIDX"']
                        },
                        IE10: {
                            base: 'IE',
                            'x-ua-compatible': 'IE=EmulateIE10'
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-markdown');

    grunt.registerTask('min', ['jshint', 'uglify', 'sass', 'postcss', 'markdown', 'compress', 'copy']);
    grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'postcss', 'markdown', 'compress', 'copy', 'karma:tz']);
    grunt.registerTask('watcher', ['browserSync:dev', 'watch']);
    grunt.registerTask('watchdocs', ['browserSync:docs', 'watch']);
    grunt.registerTask('test', ['browserSync:test', 'watch:test']);
    grunt.registerTask('testbrowsers', ['browserSync:browsertest']);
};