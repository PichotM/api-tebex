# API Tebex
<br/>
<p align="center">
  <a href="#"><img src="https://cdn.rawgit.com/aleen42/badges/master/src/node.svg" alt="Node.js"></a>
  <a href="#"><img src="https://cdn.rawgit.com/aleen42/badges/master/src/typescript.svg" alt="Typescript"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-GPL-blue.svg" alt="GitHub license"></a>
</p>

----

## Installation
- Get your Tebex's secret API key from [this link](https://server.tebex.io/plugins).
- Install the `api-tebex` package using your package manager
Example:
```
yarn add api-tebex
```

## Example
```js
const { TebexInstance } = require('api-tebex');

const apple = new TebexInstance('secret-api-key');

// Get webstore information
console.log(apple.server.information());

// Retrive user information
console.log(apple.players.retrieve(1000));
```

## Documentation
- You can trust JSDocs with your IDE
- You can build the documentation pages with `yarn serve:docs`
