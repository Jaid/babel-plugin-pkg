# babel-plugin-pkg


<a href="https://raw.githubusercontent.com/jaid/babel-plugin-pkg/master/license.txt"><img src="https://img.shields.io/github/license/jaid/babel-plugin-pkg?style=flat-square" alt="License"/></a> <a href="https://github.com/sponsors/jaid"><img src="https://img.shields.io/badge/<3-Sponsor-FF45F1?style=flat-square" alt="Sponsor babel-plugin-pkg"/></a>  
<a href="https://actions-badge.atrox.dev/jaid/babel-plugin-pkg/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2Fjaid%2Fbabel-plugin-pkg%2Fbadge" alt="Build status"/></a> <a href="https://github.com/jaid/babel-plugin-pkg/commits"><img src="https://img.shields.io/github/commits-since/jaid/babel-plugin-pkg/v2.1.0?style=flat-square&logo=github" alt="Commits since v2.1.0"/></a> <a href="https://github.com/jaid/babel-plugin-pkg/commits"><img src="https://img.shields.io/github/last-commit/jaid/babel-plugin-pkg?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/jaid/babel-plugin-pkg/issues"><img src="https://img.shields.io/github/issues/jaid/babel-plugin-pkg?style=flat-square&logo=github" alt="Issues"/></a>  
<a href="https://npmjs.com/package/babel-plugin-pkg"><img src="https://img.shields.io/npm/v/babel-plugin-pkg?style=flat-square&logo=npm&label=latest%20version" alt="Latest version on npm"/></a> <a href="https://github.com/jaid/babel-plugin-pkg/network/dependents"><img src="https://img.shields.io/librariesio/dependents/npm/babel-plugin-pkg?style=flat-square&logo=npm" alt="Dependents"/></a> <a href="https://npmjs.com/package/babel-plugin-pkg"><img src="https://img.shields.io/npm/dm/babel-plugin-pkg?style=flat-square&logo=npm" alt="Downloads"/></a>

**Resolves _PKG_VERSION to version from package.json - also works with any other field!**


This plugin attempts to dynamically replace expressions starting with `process.env.REPLACE_PKG_`.



## Installation

<a href="https://npmjs.com/package/babel-plugin-pkg"><img src="https://img.shields.io/badge/npm-babel--plugin--pkg-C23039?style=flat-square&logo=npm" alt="babel-plugin-pkg on npm"/></a>

```bash
npm install --save-dev babel-plugin-pkg@^2.1.0
```

<a href="https://yarnpkg.com/package/babel-plugin-pkg"><img src="https://img.shields.io/badge/Yarn-babel--plugin--pkg-2F8CB7?style=flat-square&logo=yarn&logoColor=white" alt="babel-plugin-pkg on Yarn"/></a>

```bash
yarn add --dev babel-plugin-pkg@^2.1.0
```

<a href="https://github.com/jaid/babel-plugin-pkg/packages"><img src="https://img.shields.io/badge/GitHub Packages-@jaid/babel--plugin--pkg-24282e?style=flat-square&logo=github" alt="@jaid/babel-plugin-pkg on GitHub Packages"/></a>  
(if [configured properly](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages))

```bash
npm install --save-dev @jaid/babel-plugin-pkg@^2.1.0
```



## Example

Reference fields from your `package.json` in your source files.

`package.json`
```json
{
  "name": "readable-ms",
  "version": "1.2.3"
}
```

`src/index.js`
```js
console.log(`This is ${process.env.REPLACE_PKG_NAME} v${process.env.REPLACE_PKG_VERSION}`)
```

This will be transpiled to:
`dist/index.js`
```js
console.log("This is readable-ms v1.2.3")
```



## Usage

Add to your Babel configuration.

`.babelrc.js`
```js
module.exports = {
  plugins: [
    "pkg"
  ]
}
```



## Options



<table>
<tr>
<th></th>
<th>Default</th>
<th>Info</th>
</tr>
<tr>
<td>cwd</td>
<td>(determined by Babel)</td>
<td>The directory which the search for the package.json file begins in.</td>
</tr>
<tr>
<td>nameFallback</td>
<td>true</td>
<td>If true and package.json does not contain a "name" field, the folder name that contains the chosen package.json file will be used as replacement.</td>
</tr>
<tr>
<td>prefix</td>
<td>REPLACE_PKG_</td>
<td>Only members of process.env starting with this string will be replaced.</td>
</tr>
</table>











## Development



Setting up:
```bash
git clone git@github.com:jaid/babel-plugin-pkg.git
cd babel-plugin-pkg
npm install
```
Testing:
```bash
npm run test:dev
```
Testing in production environment:
```bash
npm run test
```


## License
[MIT License](https://raw.githubusercontent.com/jaid/babel-plugin-pkg/master/license.txt)  
Copyright © 2020, Jaid \<jaid.jsx@gmail.com> (https://github.com/jaid)
