module.exports = function(grunt) {

    var banner = '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>' + "\n" +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */' + "\n\n";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                //Will always fail, because of the ; before the actual code
                force: true,
                //Hinting options
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                laxcomma: true,
                globals: {
                    jQuery: true
                }
            },
            build: {
                src: 'src/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: banner,
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                banner: banner,
                stripBanners: true,
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.js'
            }
        },
        watch:
                {
                    build: {
                        files:  ['src/<%= pkg.name %>.js'],
                        tasks: ['default']
                    }
                }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};