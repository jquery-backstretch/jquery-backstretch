/*global module:false*/
module.exports = function (grunt) {
    require('jit-grunt')(grunt);
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n*/\n'
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>',
                stripBanners: true

            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= pkg.name %>.min.js',
            }
        },
        jshint: {
            options:
                    {
                        curly: true,
                        eqeqeq: true,
                        immed: true,
                        latedef: false,
                        newcap: true,
                        noarg: true,
                        sub: true,
                        undef: true,
                        boss: true,
                        eqnull: true,
                        browser: true,
                        laxcomma: true,
                        globals: {
                            jQuery: true,
                            require: true
                        }
                    },
            dist: {
                src: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            }
        },
        watch: {
            dist: {
                files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
                tasks: ['lint', 'qunit']
            }
        },
        connect: {
            server: {
                options: {
                    port: 8421,
                    base: '.'
                }
            }
        },
        qunit: {
            dist: {
                options: {
                    urls: [
                        'http://localhost:8421/test/backstretch.html'
                    ]
                }
            }
        }
    });
    grunt.registerTask('default', ['jshint', 'test', 'concat', 'uglify']);
    grunt.registerTask('test', ['connect', 'qunit']);
};