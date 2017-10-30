# React Component Template Generator

## Install
Clone repo and install dependencies
```bash
$ git clone https://github.com/johannestretton37/react-template-generator.git
$ cd react-template-generator
$ npm install
```

Install dependencies
```bash
yarn
```

Create a symlink
```bash
yarn link
```

Make the app executable
```bash
chmod +x index.js
```

## Usage
Execute the script from the folder where you want to generate the React Component.
This will create a folder named **ComponentName** with a simple react template class.
```bash
$ rg ComponentName
```

You can specify a path if you want, relative to your current directory. Any non existing folders will be automatically created.
```bash
$ rg path/to/ComponentName
```
