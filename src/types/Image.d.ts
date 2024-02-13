export type Image = {
  id: number;
  url: string;
  parentId: number;
  parentType: "post" | "comment";
};
