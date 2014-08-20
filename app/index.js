'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var LeanGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Lean generator!'));

    var prompts = [{
      type: 'rawList',
      name: 'orm',
      message: 'Which ORM would you like to use?',
      choices: [
        "mongoose (Mongo ORM)",
        "norm (Redis ORM)"
      ]
    }];

    this.prompt(prompts, function (props) {
      this.orm = props.orm;
      if(this.orm === "mongoose") {
        return 'This has not been implemented'
      }

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('libs');
    this.mkdir('modules')
    this.copy('_package.json', 'package.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = LeanGenerator;
