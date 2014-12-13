/*
 * grunt-contrib-spritify
 * https://github.com/soundasleep/grunt-contrib-spritify
 *
 * Copyright (c) 2014 Jevon Wright
 * Licensed under the GPL-3.0 license.
 */

'use strict';

var shell = require('shelljs');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('spritify', 'Process CSS stylesheets to generate sprite images.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // TODO default options
      "png": "sprites.png",
      "noRandParam": false
    });

    var ret = null;

    var input = options.input;
    var output = options.output;
    var png = options.png;

    var spritifyScript = (grunt.file.exists("node_modules/grunt-contrib-spritify") ? "node_modules/grunt-contrib-spritify/" : "") + "vendor/soundasleep/spritify/spritify.php";

    grunt.verbose.writeln("Input: " + input);
    grunt.verbose.writeln("Output: " + output);
    grunt.verbose.writeln("PNG: " + png);

    var changePath = "";
    if (grunt.file.exists("node_modules/grunt-contrib-spritify")) {
      changePath = "cd node_modules/grunt-contrib-spritify && ";
    }

    if (!grunt.file.exists(spritifyScript)) {
      // try installing with composer
      grunt.log.write("Installing latest spritify package using Composer...");
      ret = shell.exec(changePath + "composer update");
      if (ret.code) {
        grunt.warn("Composer update returned " + ret);
      }
    }

    var bin = "php";
    var args = [
      "-f",
      spritifyScript,
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

    var command = bin + " " + args.join(' ');
    grunt.verbose.writeln('Command: ' + command);

    ret = shell.exec(command);
    if (ret.code) {
      grunt.warn("Script returned " + ret);
    }

  });

};
