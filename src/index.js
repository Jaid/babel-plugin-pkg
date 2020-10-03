import camelcase from "camelcase"
import path from "path"
import {sync as readPkgUp} from "read-pkg-up"

const debug = require("debug")(process.env.REPLACE_PKG_NAME)

/**
 * @typedef {Object} BabelPlugin
 * @prop {() => void} [pre]
 * @prop {() => void} [post]
 * @prop {import("@babel/traverse").Visitor} visitor
 */

/**
 * @return {BabelPlugin}
 */
export default ({types}) => {
  let options
  /**
   * @type {(state: any) => void}
   */
  const init = state => {
    if (options) {
      return
    }
    options = {
      cwd: state.cwd,
      prefix: "REPLACE_PKG_",
      nameFallback: true,
      ...state.opts,
    }
    options.packageJson = readPkgUp(options.cwd)
    if (options.packageJson.path) {
      debug("Got package data from %s", options.packageJson.path)
    }
    if (options.packageJson.package) {
      debug("Data: %o", options.packageJson.package)
    }
  }
  /**
   * @param {string} fieldName
   * @return {*}
   */
  const getReplaceValue = fieldName => {
    if (fieldName === "path" && options.packageJson?.path) {
      return options.packageJson.path
    }
    if (fieldName === "title" && !options.packageJson?.packageJson?.title) {
      fieldName = "name"
    }
    if (options.nameFallback && fieldName === "name" && !options.packageJson?.packageJson?.name) {
      return path.basename(options.cwd)
    }
    if (options.packageJson?.packageJson?.[fieldName]) {
      return options.packageJson.packageJson[fieldName]
    }
  }
  return {
    visitor: {
      /**
       * @param {Object} needle Need to disable TypeScript checks here, they are not accurate
       * @param {Object} state
       */
      MemberExpression(needle, state) {
        init(state)
        /**
         * @type {string}
         */
        const propertyName = needle.node.property?.name
        if (!propertyName) {
          return
        }
        if (!propertyName.startsWith(options.prefix)) {
          return
        }
        const parentObject = needle.node.object
        if (!parentObject?.property) {
          return
        }
        if (parentObject.property.name !== "env") {
          return
        }
        const parentParentObject = parentObject.object
        if (!parentParentObject) {
          return
        }
        if (parentParentObject.name !== "process") {
          return
        }
        const fieldName = camelcase(propertyName.slice(options.prefix.length))
        const replaceValue = getReplaceValue(fieldName)
        if (replaceValue !== undefined) {
          // Wrapping in enabled check to avoid unneeded JSON.stringify calls
          if (debug.enabled) {
            debug(`process.env.${propertyName} → ${JSON.stringify(replaceValue)}`)
          }
          needle.replaceWith(types.valueToNode(replaceValue))
        } else {
          debug(`Requested package field ${fieldName} in process.env.${propertyName}, but it was not found`)
        }
      },
    },
  }
}