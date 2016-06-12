//require('load-grunt-tasks')(grunt);


module.exports = function (grunt) {
    
     grunt.initConfig({
          concurrent: {
               dev: ["nodemon", "watch"],
                    options: {
                    logConcurrentOutput: true
               }
          },
          nodemon: {
               dev: {
                    script: 'weavver.js',
                    ignore: ['units/**', '']
               }
          },
          uglify: {
               my_target: {
                    files: [{
                         expand: true,
                         cwd: 'public/scripts',
                         src: '**/*.js',
                         dest: 'dest/js/weavver.js'
                    }]
               }
          },
          concat: {
               options: {
                    separator: ';',
               },
               dist: {
                    src: ['public/scripts/**/*.js'],
                    dest: 'dist/weavver.js',
               }
          },
          watch: {
               js: {
                files: ["app.js"],
                //tasks: ['nodemon'],
                options: { nospawn: true, livereload: true }
               }
          }
     });

     grunt.loadNpmTasks('grunt-concurrent');
     grunt.loadNpmTasks('grunt-nodemon');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-concat');
};