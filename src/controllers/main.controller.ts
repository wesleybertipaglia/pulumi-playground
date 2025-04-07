import { chooseRunMode } from "../views/main.view";
import { runFileController } from "./file.controller";
import { runTemplateController } from "./template.controller";
import { chooseFile } from "../views/file.view";

export async function runMainController() {
  const mode = await chooseRunMode();

  switch (mode) {
    case "template":
      await runTemplateController();
      break;

    case "file":
      const filePath = await chooseFile();
      await runFileController(filePath);
      break;

    default:
      console.error("❌ Unknown mode selected.");
      process.exit(1);
  }
}
