import path from "path"

import yargs from "yargs"
import fsp from "@absolunet/fsp"
import fss from "@absolunet/fss"
import ensureStart from "ensure-start"

const job = async ({extension, cwd, fullPath, all}) => {
  const entries = await fsp.readdir(cwd)
  const fileEntries = entries.filter(name => fss.stat(path.join(cwd, name)).isFile())
  let matches = []
  for (const suffix of extension.split("|")) {
    const normalizedSuffix = ensureStart(suffix, ".")
    for (const fileEntry of fileEntries) {
      if (fileEntry.endsWith(normalizedSuffix)) {
        matches.push(fileEntry)
      }
    }
  }
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