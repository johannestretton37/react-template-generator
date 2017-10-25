# React Component Template Generator

## Install
Clone repo
```bash
git clone https://github.com/johannestretton37/react-template-generator.git
```

Copy the `reactGenerator` folder into your local bin
```bash
cd react-template-generator
cp -r reactGenerator ~/bin/
```

Make the start script executable
```bash
chmod u+x ~/bin/reactGenerator/run.sh
```

Add a symlink
```bash
ln ~/bin/reactGenerator/run.sh /usr/local/bin/rg
```
**NOTE:** Feel free to name the symlink how you want. I used `rg` in the example above (short for React Generator).

## Run
Execute the script from the folder where you want to generate the React Component.
This will create a folder named **ComponentName** with a simple react template class.
```bash
rg ComponentName
````

