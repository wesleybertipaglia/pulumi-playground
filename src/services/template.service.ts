import { LocalWorkspace, LocalProgramArgs } from "@pulumi/pulumi/automation";
import path from "path";
import os from "os";
import fs from "fs";
import { execSync } from "child_process";
import { randomUUID } from "crypto";

const WORK_DIR = path.join(os.tmpdir(), "pulumi-playground");

export async function deployStackByTemplate(
  template: string,
  config: Record<string, string> = {}
) {
  const stackName = `playground-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const projectDir = path.join(WORK_DIR, stackName);

  console.log(`📦 Initializing Pulumi template: ${template}...`);
  execSync(`pulumi new ${template} --dir ${projectDir} --yes --force`, {
    stdio: "inherit",
  });

  const stack = await LocalWorkspace.createOrSelectStack({
    stackName,
    workDir: projectDir,
  } as LocalProgramArgs);

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
    fs.rmSync(projectDir, { recursive: true, force: true });
    console.log("✅ Stack destroyed and cleaned up.");
  }, 5 * 60 * 1000);
}
