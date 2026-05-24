// Generates lib/static-lastmod.json mapping each static route to the last git
// commit date (ISO 8601) of its source file. Runs at build time (prebuild) so
// the sitemap can emit a real <lastmod> for static pages without needing git at
// runtime (serverless hosts have no .git). Falls back to "now" for files with
// no commit history yet.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

const ROUTES = {
  "/": "app/page.tsx",
  "/about": "app/about/page.tsx",
  "/services": "app/services/page.tsx",
  "/projects": "app/projects/page.tsx",
  "/blog": "app/blog/page.tsx",
  "/news": "app/news/page.tsx",
  "/careers": "app/careers/page.tsx",
  "/contact": "app/contact/page.tsx",
  "/policy-privacy": "app/policy-privacy/page.tsx",
  "/terms-and-conditions": "app/terms-and-conditions/page.tsx",
};

const out = {};
for (const [route, file] of Object.entries(ROUTES)) {
  let iso = "";
  try {
    iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      encoding: "utf8",
    }).trim();
  } catch {
    iso = "";
  }
  out[route] = iso || new Date().toISOString();
}

const dest = path.join(process.cwd(), "lib", "static-lastmod.json");
writeFileSync(dest, JSON.stringify(out, null, 2) + "\n");
console.log(`[gen-static-lastmod] wrote ${dest}`);
for (const [r, d] of Object.entries(out)) console.log(`  ${r} -> ${d}`);
