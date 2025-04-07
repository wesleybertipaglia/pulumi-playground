import { LocalWorkspace } from "@pulumi/pulumi/automation";
import { createS3Bucket } from "./templates/aws_bucket_s3";

export async function runPlaygroundStack(template: string) {
  const stackName = `playground-${Date.now()}`;
  const projectName = "playground";

  const program = async () => {
    switch (template) {
      case "s3":
        return await createS3Bucket();
      default:
        throw new Error("Invalid template");
    }
  };

  const stack = await LocalWorkspace.createOrSelectStack({
    stackName,
    projectName,
    program,
  });

  console.log(`🚀 Deploying stack: ${stackName}`);
  await stack.setConfig("aws:region", { value: "us-east-1" });

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
