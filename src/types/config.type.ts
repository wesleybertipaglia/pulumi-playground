export type RunMode = "file" | "template";

export interface ConfigFile {
  template: string;
  config?: Record<string, string>;
}
