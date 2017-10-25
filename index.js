const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const suggestedName = args[0];
if (suggestedName == '' || null || undefined) {
  process.exit(0);
}

let componentName = suggestedName;
if (suggestedName[0].toUpperCase() !== suggestedName[0]) {
  componentName = suggestedName[0].toUpperCase() + suggestedName.substring(1);
}

console.log('This will generate a React component folder named:', componentName);

const folderName = componentName;

const indexFileContent = `import ${componentName} from './${componentName}'
export default ${componentName}
`

const compFileContent = `import React from 'react'
import './${componentName}.css'

class ${componentName} extends React.Component {
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
try {
  fs.mkdirSync(folderName);
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

let filesCreated = 0;
// Create files
for (let i in files) {
  let file = files[i];
  fs.writeFile(path.join(folderName, file.name), file.content, (err) => {
    if (err) throw err;
    console.log(`Created ${folderName}/${file.name}`);
    filesCreated++;
    if (filesCreated == files.length) {
      console.log(`React component ${componentName} successfully created.`)
    }
  })
}
