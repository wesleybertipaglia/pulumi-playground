import inquirer from "inquirer";
import { pulumiTemplates } from "../data/templates.list";

export async function chooseTemplate(): Promise<string> {
  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "📦 Choose a Pulumi template:",
      pageSize: 20,
      choices: pulumiTemplates,
    },
  ]);

  return template;
}
