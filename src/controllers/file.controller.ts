import { runPlaygroundStack } from "../playground";
import { loadConfigFile } from "../services/file.service";
import { stacks } from "../services/template.service";
import { chooseFile } from "../views/file.view";

export async function runFromFileController() {
  const filePath = await chooseFile();
  const parsed = loadConfigFile(filePath);

  if (!parsed || !parsed.template || !(parsed.template in stacks)) {
    console.error("❌ Invalid or missing template in config file.");
    process.exit(1);
  }

  await runPlaygroundStack(parsed.template, parsed.config ?? {});
}
