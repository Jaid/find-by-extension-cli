import path from "path"

import coffee from "coffee"

const main = path.resolve(process.env.MAIN)

it("should run", () => coffee.fork(main, ["gitignore"])
  .expect("code", 0)
  .expect("stdout", ".gitignore")
  .end())

it("should collect multiple files", () => coffee.fork(main, ["js", "--all", "--absolute"])
  .expect("code", 0)
  .expect("stdout", /\n/s)
  .end())