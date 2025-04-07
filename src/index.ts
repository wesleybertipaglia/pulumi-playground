import { chooseRunMode, chooseTemplate, chooseFile } from "./prompts";
import { runPlaygroundStack, runFromFile } from "./playground";

(async () => {
  const mode = await chooseRunMode();

  if (mode === "template") {
    const template = await chooseTemplate();
    await runPlaygroundStack(template);
  } else {
    const filePath = await chooseFile();
    await runFromFile(filePath);
  }
})();
