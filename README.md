# React Component Template Generator

## Install
Clone repo and install dependencies
```bash
$ git clone https://github.com/johannestretton37/react-template-generator.git
$ cd react-template-generator
$ npm install
```
Create start script
```bash
$ echo "node \${PWD}/reactGenerator/ \"\$1\"" >> reactGenerator/run.sh
```
Add a symlink and make the start script executable
```bash
$ ln reactGenerator/run.sh /usr/local/bin/rg
$ chmod u+x reactGenerator/run.sh
```
**NOTE:** Feel free to name the symlink how you want. I used `rg` in the example above (short for React Generator).

## Run
Execute the script from the folder where you want to generate the React Component.
This will create a folder named **ComponentName** with a simple react template class.
```bash
$ rg ComponentName
```

You can specify a path if you want, relative to your current directory. Any non existing folders will be automatically created.
```bash
$ rg path/to/ComponentName
```
