import path from "path"

import babelPluginTester from "babel-plugin-tester"

const indexModule = process.env.MAIN ? path.resolve(__dirname, "..", process.env.MAIN) : path.join(__dirname, "..", "src")
const {default: plugin} = require(indexModule)

babelPluginTester({
  plugin,
  pluginName: "babel-plugin-pkg",
  babelOptions: {
    babelrc: false,
  },
  fixtures: path.join(__dirname, "fixtures"),
})