const inquirer = require('inquirer');

inquirer
  .prompt({
  type: 'list',
  name: 'action',
  message: 'What would you like to do?',
  choices: '[]'
  })