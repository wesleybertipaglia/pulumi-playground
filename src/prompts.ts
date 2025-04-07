import inquirer from "inquirer";

export type RunMode = "file" | "template";

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

export async function chooseFile(): Promise<string> {
  const { file } = await inquirer.prompt([
    {
      type: "input",
      name: "file",
      message: "📂 Enter the path to the config file:",
      validate: (input) => {
        if (!input) {
          return "Please enter a valid path.";
        }
        return true;
      },
    },
  ]);
  return file;
}

export async function chooseTemplate(): Promise<string> {
  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "🧱 Choose a template:",
      choices: [{ name: "AWS S3 Bucket", value: "s3" }],
    },
  ]);

  return template;
}
