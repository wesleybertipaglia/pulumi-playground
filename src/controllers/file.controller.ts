import { runFromFile } from "../services/file.service";

export async function runFileController(filePath: string) {
  await runFromFile(filePath);
}
