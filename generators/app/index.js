'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'visualization name: (no spaces a-z and _)'
    },{
      type: 'input',
      name: 'title',
      message: 'visualization title:'
    },{
      type: 'input',
      name: 'description',
      message: 'visualization description:'
    },{
      type: 'list',
      name: 'type',
      message: 'visualization type:',
      choices: [ 'js', 'angular', 'react', 'vislib' ],
      default: 'angular'
    },{
      type: 'list',
      name: 'editor',
      message: 'editor type:',
      choices: [ 'default', 'custom' ],
      default: 'default'
    },{
      type: 'list',
      name: 'request_handler',
      message: 'Request handler:',
      choices: [ 'none', 'courier', 'custom' ],
      default: 'courier'
    },{
      type: 'list',
      name: 'response_handler',
      message: 'Response handler:',
      choices: [ 'none', 'tabify', 'basic', 'custom' ],
      default: 'tabify'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      const nameUpper = this.props.name.split('_').map(_.capitalize).join('');
      const typeUpper = _.capitalize(this.props.type);
      this.props.vis_provider = `${nameUpper}Provider`;
      this.props.vis_type_provider = `${typeUpper}VisTypeFactoryProvider`;
      this.props.vis_type_path = `vis_types/${this.props.type}_vis_type`;
      this.props.vis_type_factory = `${typeUpper}VisTypeFactory`;
      this.props.factory_type = typeUpper;
      if (this.props.type === 'angular') {
        this.props.controller_name = `Kbn${nameUpper}Controller`;
      } else if (this.props.type === 'js') {
        this.props.vis_type_provider = `VisTypeFactoryProvider`;
        this.props.vis_type_path = `vis_type`;
        this.props.vis_type_factory = `VisTypeFactory`;
        this.props.factory_type = 'Base';
      }
    });

  }

  writing() {
    this.destinationRoot(this.destinationPath(`src/core_plugins/${this.props.name}`));

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('public/vis.js'),
      this.destinationPath(`public/${this.props.name}.js`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('public/vis.less'),
      this.destinationPath(`public/${this.props.name}.less`),
      this.props
    );

    if (this.props.type === 'angular') {
      this.fs.copyTpl(
        this.templatePath('public/vis_controller_angular.js'),
        this.destinationPath('public/vis_controller.js'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('public/vis_template.html'),
        this.destinationPath('public/vis_template.html'),
        this.props
      );
    }

    if (this.props.type === 'react') {
      this.fs.copyTpl(
        this.templatePath('public/vis_component.js'),
        this.destinationPath('public/vis_component.js'),
        this.props
      );
    }

    if (this.props.type === 'js') {
      this.fs.copyTpl(
        this.templatePath('public/vis_controller.js'),
        this.destinationPath('public/vis_controller.js'),
        this.props
      );
    }

    if (this.props.editor === 'default') {
      this.fs.copyTpl(
        this.templatePath('public/options_template.html'),
        this.destinationPath('public/options_template.html'),
        this.props
      );
    }

    if (this.props.editor === 'custom') {
      this.fs.copyTpl(
        this.templatePath('public/editor_controller.js'),
        this.destinationPath('public/editor_controller.js'),
        this.props
      );
    }

    if (this.props.request_handler === 'custom') {
      this.fs.copyTpl(
        this.templatePath('public/request_handler.js'),
        this.destinationPath('public/request_handler.js'),
        this.props
      );
    }

    if (this.props.response_handler === 'custom') {
      this.fs.copyTpl(
        this.templatePath('public/response_handler.js'),
        this.destinationPath('public/response_handler.js'),
        this.props
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
