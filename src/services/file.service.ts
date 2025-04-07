import fs from "fs";
import yaml from "js-yaml";
import path from "path";

export interface ConfigFile {
  template: string;
  config?: Record<string, string>;
}

export function loadConfigFile(filePath: string): ConfigFile {
  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`❌ Config file not found: ${resolvedPath}`);
  }

  const content = fs.readFileSync(resolvedPath, "utf-8");
  const parsed = yaml.load(content) as ConfigFile;

  if (!parsed?.template) {
    throw new Error("❌ Missing template in config file.");
  }

  return parsed;
}
