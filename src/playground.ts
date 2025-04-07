import { LocalWorkspace } from "@pulumi/pulumi/automation";
import { createS3Bucket } from "./templates/aws_bucket_s3";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

interface ConfigFile {
  template: string;
  config?: Record<string, string>;
}

const stacks: Record<string, () => Promise<any>> = {
  s3: createS3Bucket,
};

export async function runPlaygroundStack(
  template: string,
  config: Record<string, string> = {}
) {
  const stackName = `playground-${Date.now()}`;
  const projectName = "playground";

  const program = stacks[template];

  if (!program) {
    console.error(`❌ Unknown template: ${template}`);
    process.exit(1);
  }

  const stack = await LocalWorkspace.createOrSelectStack({
    stackName,
    projectName,
    program,
  });

  for (const [key, value] of Object.entries(config)) {
    await stack.setConfig(key, { value });
  }

  console.log(`🚀 Deploying stack: ${stackName}`);
  const upResult = await stack.up({ onOutput: console.log });

  console.log("\n✅ Deployment Complete:");
  console.log(upResult.outputs);

  setTimeout(async () => {
    console.log(`\n🧹 Destroying stack ${stackName}...`);
    await stack.destroy();
    await stack.workspace.removeStack(stackName);
    console.log("✅ Stack destroyed.");
  }, 5 * 60 * 1000);
}

export async function runFromFile(filePath: string) {
  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error("❌ Config file not found:", resolvedPath);
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedPath, "utf-8");
  const parsed: ConfigFile = yaml.load(content) as ConfigFile;

  if (!parsed?.template || !(parsed.template in stacks)) {
    console.error("❌ Invalid or missing template in config file.");
    process.exit(1);
  }

  await runPlaygroundStack(parsed.template, parsed.config ?? {});
}
