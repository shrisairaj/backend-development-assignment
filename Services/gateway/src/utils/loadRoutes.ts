import fs from "fs";
import path from "path";
import { RoutesMap } from "../config/route.types";

export function loadRoutesConfig(): RoutesMap {
  const configPath = path.join(__dirname, "../config/routes.json");
  const file = fs.readFileSync(configPath, "utf-8");

  const routes: RoutesMap = JSON.parse(file);
  return routes;
}
