import inquirer from "inquirer";
import type { RunMode } from "../types/config.type";

export async function chooseRunMode(): Promise<RunMode> {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "🧪 How do you want to run your playground?",
      choices: [
        { name: "📂 Load from config file (JSON/YAML)", value: "file" },
        { name: "🧱 Choose a template manually", value: "template" },
      ],
    },
  ]);
  return mode;
}
