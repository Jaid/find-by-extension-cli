import path from "path"

import yargs from "yargs"
import fsp from "@absolunet/fsp"
import fss from "@absolunet/fss"
import ensureStart from "ensure-start"

const job = async ({extension, cwd, fullPath, all}) => {
  const suffix = ensureStart(extension, ".")
  const entries = await fsp.readdir(cwd)
  let matches = entries
  |> #.filter(name => name.endsWith(suffix))
  |> #.filter(name => fss.stat(path.join(cwd, name)).isFile())
  if (matches.length === 0) {
    process.exit(1)
  }
  if (fullPath) {
    matches = matches.map(name => path.join(cwd, name))
  }
  if (all) {
    process.stdout.write(matches.join("\n"))
  } else {
    process.stdout.write(matches[0])
  }
}

const builder = {
  "full-path": {
    default: false,
    type: "boolean",
  },
  all: {
    default: false,
    type: "boolean",
  },
  cwd: {
    default: process.cwd(),
    type: "string",
  },
}
yargs.command("$0 <extension>", "Prints a file name with specified extension", builder, job).argv