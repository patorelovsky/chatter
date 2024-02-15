export type Comment = {
  id: number;
  text: string;
  parentId: number;
  parentType: "post" | "comment";
};
