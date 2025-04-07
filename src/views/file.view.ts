import inquirer from "inquirer";

export async function chooseFile(): Promise<string> {
  const { file } = await inquirer.prompt([
    {
      type: "input",
      name: "file",
      message: "📂 Enter the path to the config file:",
      validate: (input) => {
        if (!input) {
          return "⚠️ Please enter a valid path.";
        }
        return true;
      },
    },
  ]);
  return file;
}
