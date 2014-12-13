/*
 * grunt-contrib-spritify
 * https://github.com/soundasleep/grunt-contrib-spritify
 *
 * Copyright (c) 2014 Jevon Wright
 * Licensed under the GPL-3.0 license.
 */

'use strict';

var spawn = require('win-spawn');
var async = require('async');
var numCPUs = require('os').cpus().length || 1;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('spritify', 'Process CSS stylesheets to generate sprite images.', function() {
    var cb = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // TODO default options
      "png": "sprites.png",
      "noRandParam": false
    });

    var input = options.input;
    var output = options.output;
    var png = options.png;

    grunt.verbose.writeln("Input: " + input);
    grunt.verbose.writeln("Output: " + output);
    grunt.verbose.writeln("PNG: " + png);

    var bin = "php";
    var args = [
      "-f",
      "vendor/soundasleep/spritify/spritify.php",
      "--",
      "--input",
      input,
      "--output",
      output,
      "--png",
      png
    ];

    if (options.noRandParam) {
      args.push("--no-rand-param");
    }

    grunt.verbose.writeln('Command: ' + bin + ' ' + args.join(' '));

    async.eachLimit([1], numCPUs, function (file, next) {
      var cp = spawn(bin, args, {stdio: 'inherit'});

      cp.on('error', function (err) {
        grunt.warn(err);
      });

      cp.on('close', function (code) {
        if (code > 0) {
          return grunt.warn('Exited with error code ' + code);
        }

        grunt.verbose.writeln('File ' + output + ' created.');
        next();
      });
    }, cb);


    // grunt.log.warn("input = " + options.input);

    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
