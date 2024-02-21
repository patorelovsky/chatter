import { TextObject } from "./TextObject";

export type Comment = TextObject & {
  id: number;
  parentId: number;
  parentType: "post" | "comment";
};
