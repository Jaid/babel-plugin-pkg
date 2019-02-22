import path from "path"

import {sync as readPkgUp} from "read-pkg-up"

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
    }
  },
  visitor: {
    ReferencedIdentifier(needle, state) {
      this.init(state)
      if (needle.node.name.startsWith(this.options.prefix)) {
        const fieldName = needle.node.name.slice(this.options.prefix.length)
        if (fieldName === "PATH" && this.options.packageJson?.path) {
          needle.replaceWith(types.valueToNode(this.options.packageJson.path))
        }
        if (this.options.nameFallback && fieldName === "NAME" && !this.options.packageJson?.pkg?.name) {
          needle.replaceWith(types.valueToNode(path.basename(this.options.cwd)))
        }
        if (this.options.packageJson?.pkg?.[fieldName.toLowerCase()]) {
          needle.replaceWith(types.valueToNode(this.options.packageJson.pkg[fieldName.toLowerCase()]))
        }
      }
    },
  },
})