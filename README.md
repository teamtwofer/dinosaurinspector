# dinosaurinspector

## Getting started:
1. Clone
1. `npm install` 
    * This installs dependencies for server and client
1. `npm run server:watch`
    * This sets up the build process and the API server.
1. Open `http://localhost:3000`    

## Scripts
1. `npm run server:dev` - Runs the development server without refreshing
1. `npm run server:watch` - Runs the server with refreshing + bundles the client code
1. `npm run lint` - Lints typescript files
1. `npm run lint:fix` - Runs normal lint with fixing
1. `npm run lint:prettier` - Runs a TS formatter called prettier
1. `npm run lint:fmt` - Runs `lint:fix` and `lint:fmt`
1. `npm run test` - Runs client and server tests.
1. `npm run test:update` - Runs tests and updates the snapshots.

## Editor
I use VSCode and here is the configuration I use:
```
{
    "editor.tabSize": 2,
    "files.autoSave": "onWindowChange",
    "stylelint.enable": true,
    "css.validate": false,
    "scss.validate": true,
    "editor.formatOnSave": true,
    "prettier.singleQuote": true,
    "prettier.trailingComma": "es5",
    "workbench.iconTheme": "vscode-icons",
    "auto-close-tag.SublimeText3Mode": true,
    "tslint.autoFixOnSave": true
}
```
### Recommended Extensions
1. Auto Clode Tag
1. Prettier
1. Sass
1. Stylelint
1. TSLint
1. vscode-icons 

## Server stuff
For the server we are using two typescript built libraries, nestjs and typeorm. 

### Database
We use sqlite for testing and we use postgres for development. 
Ensure you create the table in postgres (dinosaur_development)
and create a user `bbayard` with a password `potato`.

## Client stuff

### Components
Every react component should have three things. 
1. The `@observer` decorator. this comes from mobx and allows a component to refresh itself easily and efficiently. Only re-rendering components that change. 
2. A pure render function. Nothing but destructuring and rendering other components.
3. Extend `React.PureComponent`. While this isn't strictly necessary due to mobx it is a good convention.
