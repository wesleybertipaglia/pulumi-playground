import { chooseTemplate } from "./prompts";
import { runPlaygroundStack } from "./playground";

(async () => {
  const template = await chooseTemplate();
  await runPlaygroundStack(template);
})();
