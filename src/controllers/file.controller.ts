import { chooseFile } from "../views/file.view";
import { loadConfigFile } from "../services/file.service";
import { deployStackByTemplate } from "../services/template.service";

export async function runFileController() {
  const filePath = await chooseFile();
  const config = loadConfigFile(filePath);
  await deployStackByTemplate(config.template, config.config ?? {});
}
