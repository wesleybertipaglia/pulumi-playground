import { LocalWorkspace } from "@pulumi/pulumi/automation";
import { stacks } from "./stack.service";

export async function deployStackByTemplate(
  template: string,
  config: Record<string, string> = {}
) {
  const program = stacks[template];

  if (!program) {
    console.error(`❌ Unknown template: ${template}`);
    process.exit(1);
  }

  const stackName = `playground-${Date.now()}`;
  const projectName = "playground";

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
