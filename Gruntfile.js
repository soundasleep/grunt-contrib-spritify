/*
 * grunt-soundasleep-spritify
 * https://github.com/soundasleep/grunt-soundasleep-spritify
 *
 * Copyright (c) 2014 Jevon Wright
 * Licensed under the GPL-3.0 license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    mkdir: {
      all: {
        options: {
          create: ['tmp']
        }
      }
    },

    // Configuration to be run (and then tested).
    spritify: {
      media_query: {
        options: {
          'input': 'test/fixtures/media-query.css',
          'output': 'tmp/media-query',
        }
      },
      single_rule: {
        options: {
          'input': 'test/fixtures/single-rule.css',
          'output': 'tmp/single-rule',
        }
      },
      sizes: {
        options: {
          input: 'test/fixtures/sizes.css',
          output: 'tmp/sizes',
          png: 'sprites-sizes.png',
          noRandParam: true
        }
      }
      // TODO test custom options
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-mkdir');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mkdir', 'spritify', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
