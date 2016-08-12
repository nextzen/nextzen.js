Build Locally
====

MapzenJS uses [npm]((https://docs.npmjs.com/getting-started/installing-node)) for its building process. To run `mapzen.js` locally or to run examples in `examples` folder locally, `mapzen.js` expects the steps below.

```
npm install
```
The comand above will install depandancies for the development.

```
npm run build
```
This command bundles the javascript source files in `src` folder to `dist` , also compiles scss files to css.

If you are planning to actively changing the code, the commands below would help.
```
npm run dev
```

This command watches javascript source files and spits out the compiled script whenever there is change.
```
npm run build-dev-style
```
This command watches scss files and compiles them to the css whenever change happens in the source files.
