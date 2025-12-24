import fs from "fs";
import path from "path";

const ROUTES_PATH = path.join(
  process.cwd(),
  "src/config/routes.json"
);

let routesCache: any = {};

export function loadRoutesConfig() {
  if (Object.keys(routesCache).length === 0) {
    routesCache = JSON.parse(fs.readFileSync(ROUTES_PATH, "utf-8"));
    console.log("✓ Routes configuration loaded at startup");
  }
  return routesCache;
}

// 🔁 Hot reload
fs.watchFile(ROUTES_PATH, () => {
  try {
    routesCache = JSON.parse(fs.readFileSync(ROUTES_PATH, "utf-8"));
    console.log("✓ Routes configuration reloaded");
  } catch (err) {
    console.error("✗ Failed to reload routes config", err);
  }
});
