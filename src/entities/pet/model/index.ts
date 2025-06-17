import Category from "@entities/category/model";
import Tag from "@entities/tag/model";

export type Status = "available" | "pending" | "sold";

export interface Pet {
  id: number,
  name: string,
  category?: Category,
  photoUrls: string[],
  tags: Tag[],
  status: Status,
};
