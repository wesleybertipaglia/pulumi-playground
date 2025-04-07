import inquirer from "inquirer";

export async function chooseTemplate(): Promise<"s3"> {
  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "🧪 Choose a template to provision:",
      choices: [{ name: "🪣 AWS S3 Bucket", value: "s3" }],
    },
  ]);

  return template;
}
