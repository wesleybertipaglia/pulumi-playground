import { runPlaygroundStack } from "../playground";
import { chooseTemplate } from "../views/template.view";

export async function runTemplateController() {
  const template = await chooseTemplate();
  await runPlaygroundStack(template);
}
