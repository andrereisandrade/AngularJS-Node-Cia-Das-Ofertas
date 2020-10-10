'use strict';
// Gruntfile.js
module.exports = function (grunt) {

    grunt.initConfig({

        // configure nodemon
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
//        shell: {
//            mongo: {
//                command: 'mongod'
//            }
//        }

    });

    // load nodemon
    grunt.loadNpmTasks('grunt-nodemon');
    // load grunt shell
    //grunt.loadNpmTasks('grunt-shell');

    // register the nodemon task when we run grunt
    grunt.registerTask('server', ['nodemon']);
    
    //grunt.registerTask('db', ['shell']);

};