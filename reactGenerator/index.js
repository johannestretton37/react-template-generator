const fs = require('fs');
const fx = require('mkdir-recursive');
const path = require('path');

const args = process.argv.slice(2);
const suggestedName = args[0];

if (suggestedName == '' || suggestedName == null || suggestedName == undefined) {
  console.log("ERROR: You must provide a component name as first argument.");
  console.log("Example: rg relative/path/to/YourComponentName");
  process.exit(0);
}


let dirPath = '';
let componentName = suggestedName;
let filePath = path.parse(suggestedName);
if (filePath.dir !== '') {
  dirPath = filePath.dir;
  componentName = filePath.name;
}

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

function createFiles() {
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

// Create folder and files
if (dirPath == '') {
  createFiles();
} else {
  fx.mkdir(dirPath, function(err) {
    if (err) throw err;
    createFiles()
  });
}


