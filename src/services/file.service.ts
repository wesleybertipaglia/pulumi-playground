import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { deployStackByTemplate } from "./template.service";

interface ConfigFile {
  template: string;
  config?: Record<string, string>;
}

export async function runFromFile(filePath: string) {
  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error("❌ Config file not found:", resolvedPath);
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedPath, "utf-8");
  const parsed: ConfigFile = yaml.load(content) as ConfigFile;

  if (!parsed?.template) {
    console.error("❌ Missing template in config file.");
    process.exit(1);
  }

  await deployStackByTemplate(parsed.template, parsed.config ?? {});
}
