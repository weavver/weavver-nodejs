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
                    script: 'app.js',
                    ignore: ['units/**', '']
               }
          },
          uglify: {
               my_target: {
                    files: [{
                         expand: true,
                         cwd: 'public/scripts',
                         src: '**/*.js',
                         dest: 'public/scripts/weavver.js'
                    }]
               }
          },
          concat: {
               options: {
                    separator: ';',
               },
               dist: {
                    src: [
                         'js/ui-states.js',
                         'js/weavver.js',
                         'js/controllers/*.js',
                         'js/plumbing/*.js',
                         'js/services/*.js'
                    ],
                    dest: 'public/scripts/weavver.js'
               }
          },
          watch: {
               css: {
                    files: ['src/css'],
                    tasks: ['uglify']
               },
               js: {
                    files: ["js/**/*.js"],
                    tasks: [
                         'concat'
                    ],
                    options: {
                         nospawn: true,
                         livereload: true
                    }
               }
          }
     });

     grunt.loadNpmTasks('grunt-concurrent');
     grunt.loadNpmTasks('grunt-nodemon');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-watch');
};