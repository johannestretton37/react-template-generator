#!/usr/bin/env node
'use strict';

const fs = require('fs');
const fx = require('mkdir-recursive');
const path = require('path');
const prompt = require('prompt');

const args = process.argv.slice(2);
const suggestedName = args[0];

if (suggestedName == '' || suggestedName == null || suggestedName == undefined) {
  console.log("ERROR: You must provide a component name as first argument.");
  console.log("Example: rg relative/path/to/YourComponentName");
  process.exit(0);
}

let configFilePath = path.join(__dirname, '.config');
let userDefaultPath = fs.existsSync(configFilePath) && fs.readFileSync(configFilePath, { encoding: 'utf-8' });

let dirPath = '';
let componentName = suggestedName;
let filePath = path.parse(suggestedName);
if (filePath.dir !== '') {
  // User provided file path
  dirPath = path.join(filePath.dir, filePath.name);
  componentName = filePath.name;

  prompt.start();
    console.log(`\n*  Do you want to save the path '${filePath.dir}' as your default directory?`)
    prompt.message = `*  Answer 'y' and press Enter to save default path. `;
    prompt.delimiter = '';
    prompt.get({
      properties: {
        defaultPath: {
          description: 'y/n?'
        }
      }
    }, (err, result) => {
      //
      // Log the results.
      //
      console.log('*  Saving default path: ' + filePath.dir);
      fs.writeFileSync(configFilePath, filePath.dir, { encoding: 'utf-8' });
      createComponent();
    });

} else {
  if (userDefaultPath) {
    dirPath = path.join(userDefaultPath, suggestedName);
  } else {
    dirPath = suggestedName;
  }
  createComponent();
}

function createComponent() {
  if (componentName[0].toUpperCase() !== componentName[0]) {
    componentName = componentName[0].toUpperCase() + componentName.substring(1);
  }
  
  console.log('This will generate a React component folder named:', dirPath, dirPath !== '' ? '/' : '', componentName);
  
  const indexFileContent = `import ${componentName} from './${componentName}'
  export default ${componentName}
  `
  
  const compFileContent = `import React, { Component } from 'react'
  import './${componentName}.css'
  
  class ${componentName} extends Component {
    render() {
      return (
        <div>
          
        </div>
      )
    }
  }
  
  export default ${componentName};
  `
  const files = [
    {
      name: 'index.js',
      content: indexFileContent,
    },
    {
      name: componentName + '.js',
      content: compFileContent,
    },
    {
      name: componentName + '.scss',
      content: ''
    },
  ];
  
  // Create folder
  fx.mkdir(dirPath, function(err) {
    if (err) throw err;
  });
  
  let filesCreated = 0;
  // Create files
  for (let i in files) {
    let file = files[i];
    fs.writeFile(path.join(dirPath, file.name), file.content, (err) => {
      if (err) throw err;
      console.log(`Created ${path.join(dirPath, file.name)}`);
      filesCreated++;
      if (filesCreated == files.length) {
        console.log(`React component ${componentName} successfully created.`)
      }
    })
  }  
}



