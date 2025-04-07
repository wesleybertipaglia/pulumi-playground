import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { ConfigFile } from "../types/config.type";

export function loadConfigFile(filePath: string): ConfigFile | null {
  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error("❌ Config file not found:", resolvedPath);
    return null;
  }

  const content = fs.readFileSync(resolvedPath, "utf-8");
  const parsed: ConfigFile = yaml.load(content) as ConfigFile;

  return parsed;
}
