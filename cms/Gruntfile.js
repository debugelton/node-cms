'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var liveReload = {
      port: 35731,
      host: '127.19.0.4'
  };
  var files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'src/app.js'
      }
    },
    sass: {
      dist: {
        files: {
          'src/public/css/style.css': 'src/public/sass/style.scss'
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: liveReload
      },
      js: {
        files: [
          'src/app.js',
          'src/app/**/*.js',
          '!src/app/**/*.marko.js',
          'src/config/*.js'
        ],
        tasks: ['develop'/*, 'delayed-livereload'*/]
      },
      css: {
        files: [
          'src/public/sass/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: liveReload
        }
      }
      // views: {
      //   files: [
      //     'src/app/views/*.marko',
      //     'src/app/views/**/*.marko'
      //   ],
      //   options: {
      //     livereload: liveReload
      //   }
      // }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    console.log('http://' + liveReload.host + ':' + liveReload.port + '/changed?files=' + files.join(','));
    var done = this.async();
    setTimeout(function () {
      request.get('http://' + liveReload.host + ':' + liveReload.port + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'sass',
    'watch'
  ]);
};
