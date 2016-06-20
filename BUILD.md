Build Locally
====

MapzenJS uses [npm]((https://docs.npmjs.com/getting-started/installing-node)) for its building process.

```
npm install
```
The comand above will install depandancies for the development.

```
npm build
```
This command bundles the javascript source files in `src` folder to `mapzen.js` , compiles scss files to css. The command also copies the `index.html` inside of `src` foler to `dist`, so result can be run easily in `dist` folder.

If you are planning to actively changing the code, the commands below would help.
```
npm run dev
```

This command watches javascript source files and spits out the compiled script whenever there is change.
```
npm run build-dev-style
```
This command watches scss files and compiles them to the css whenever change happens in the source files.
