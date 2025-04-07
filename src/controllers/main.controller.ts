import { chooseRunMode } from "../views/main.view";
import { runFileController } from "./file.controller";
import { runTemplateController } from "./template.controller";

export async function runMainController() {
  const mode = await chooseRunMode();

  switch (mode) {
    case "template":
      await runTemplateController();
      break;

    case "file":
      await runFileController();
      break;

    default:
      console.error("❌ Unknown mode selected.");
      process.exit(1);
  }
}
