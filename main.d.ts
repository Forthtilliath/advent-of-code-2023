import z from "zod";
import { argumentsSchema } from "./lib";

declare global {
  namespace AOC {
    type Arguments = z.infer<typeof argumentsSchema>;

    type FileType = "input" | "sample";
    type FileName = FileType | `${FileType}1` | `${FileType}2`;
  }
}

export {};
