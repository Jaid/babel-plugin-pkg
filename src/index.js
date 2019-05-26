import path from "path"

import {sync as readPkgUp} from "read-pkg-up"

const debug = require("debug")(_PKG_NAME)

export default ({types}) => ({
  pre() {
    this.init = state => {
      if (this.options) {
        return
      }
      this.options = {
        cwd: state.cwd,
        prefix: "_PKG_",
        nameFallback: true,
        ...state.opts,
      }
      this.options.packageJson = readPkgUp(this.options.cwd)
      if (this.options.packageJson.path) {
        debug("Got package data from %s", this.options.packageJson.path)
      }
      if (this.options.packageJson.package) {
        debug("Data: %o", this.options.packageJson.package)
      }
    }
  },
  visitor: {
    ReferencedIdentifier(needle, state) {
      this.init(state)
      if (needle.node.name.startsWith(this.options.prefix)) {
        let fieldName = needle.node.name.slice(this.options.prefix.length)
        if (fieldName === "PATH" && this.options.packageJson?.path) {
          needle.replaceWith(types.valueToNode(this.options.packageJson.path))
        }
        if (fieldName === "TITLE" && !this.options.packageJson?.package?.title) {
          fieldName = "NAME"
        }
        if (this.options.nameFallback && fieldName === "NAME" && !this.options.packageJson?.package?.name) {
          needle.replaceWith(types.valueToNode(path.basename(this.options.cwd)))
        }
        if (this.options.packageJson?.package?.[fieldName.toLowerCase()]) {
          needle.replaceWith(types.valueToNode(this.options.packageJson.package[fieldName.toLowerCase()]))
        }
      }
    },
  },
})