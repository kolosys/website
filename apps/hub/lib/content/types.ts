export type ContentItem = {
  id: string;
  name: string;
  emoji: string | null;
  source: string;
  orderIndex: number[]; // Array representing hierarchy: [groupOrder, subDirOrder, itemOrder, ...]
  slug: string[];
};

export type ContentNode = {
  id: string;
  name: string;
  emoji: string | null;
  slug: string[];
  orderIndex: number[];
  level: number; // 0 = root group, 1 = subdirectory, etc.
  items: ContentItem[]; // Files at this level
  children: ContentNode[]; // Subdirectories
};

export type ContentGroup = {
  id: string;
  name: string;
  emoji: string | null;
  group: string;
  source: string;
  items: ContentItem[];
  children?: ContentNode[]; // Nested subdirectories
};

export type TreeNode = {
  id: string;
  title: string;
  slug: string[];
  emoji: string | null;
  faIcon: string | null;
  hidden: boolean;
  order: number;
  children: TreeNode[];
};

