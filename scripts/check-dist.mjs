// dist/ is committed (apps can depend on a commit before the package is on
// npm), so it must be what the sources build to. Builds into a temporary
// folder and compares.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const temp = mkdtempSync(join(tmpdir(), "genui-dist-"));
const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]));
try {
  execFileSync(join(root, "node_modules/.bin/tsc"), ["-p", join(root, "tsconfig.json"), "--outDir", temp], { stdio: "inherit" });
  const built = files(temp).map((f) => relative(temp, f)).sort();
  const committed = files(join(root, "dist")).map((f) => relative(join(root, "dist"), f)).sort();
  const stale = built.filter((f) => !committed.includes(f) || readFileSync(join(temp, f), "utf8") !== readFileSync(join(root, "dist", f), "utf8"));
  const extra = committed.filter((f) => !built.includes(f));
  if (stale.length || extra.length) {
    console.error(`dist/ is out of date (${[...stale, ...extra].join(", ")}): run \`pnpm build\`.`);
    process.exit(1);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
