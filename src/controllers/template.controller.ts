import { chooseTemplate } from "../views/template.view";
import { deployStackByTemplate } from "../services/template.service";

export async function runTemplateController() {
  const template = await chooseTemplate();
  await deployStackByTemplate(template);
}
