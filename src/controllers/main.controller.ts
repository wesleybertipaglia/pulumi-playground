import { chooseRunMode } from "../views/main.view";
import { runFromFileController } from "./file.controller";
import { runTemplateController } from "./template.controller";

export async function runMainController() {
  const mode = await chooseRunMode();

  if (mode === "template") {
    await runTemplateController();
  } else {
    await runFromFileController();
  }
}
