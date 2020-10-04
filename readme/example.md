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