import yargs from "yargs"
import findByExtension from "find-by-extension"
import ensureArray from "ensure-array"

const job = ({extension, cwd, absolute, all}) => {
  const extensions = extension.split("|")
  const result = findByExtension(extensions, {
    cwd,
    absolute,
    all,
  })
  if (result === false) {
    process.exit(1)
  }
  const files = ensureArray(result)
  process.stdout.write(files.join("\n"))
}

const builder = {
  absolute: {
    alias: "full-path",
    default: false,
    type: "boolean",
  },
  all: {
    default: false,
    type: "boolean",
  },
  cwd: {
    alias: "directory",
    default: process.cwd(),
    type: "string",
  },
}
yargs.command("$0 <extension>", "Prints a file name with specified extension", builder, job).argv