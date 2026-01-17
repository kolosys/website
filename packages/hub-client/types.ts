export type VersionInfo = {
  tag: string;
  label: string;
  isLatest: boolean;
};

export type LibraryData = {
  id: string;
  name: string;
  fullName: string;
  description: string;
  emoji: string | null;
  faIcon: string | null;
  baseSlug: string;
  pages: number;
  lastSync: string;
  syncing: boolean;
  status: string;
  latestTag: string;
  versions?: VersionInfo[];
  featured?: boolean;
  published?: boolean;
  topics?: string[];
  stargazersCount?: number;
  homepage?: string | null;
};

export type LibraryPage = {
  page: PageData;
  navigation: NavigationData[];
  version: string;
};

export type PageData = {
  id: string;
  title: string;
  description: string | null;
  emoji: string | null;
  faIcon: string | null;
  status: string;
  content: string;
};

export type NavigationData = {
  id: string;
  title: string;
  slug: string[];
  emoji: string | null;
  faIcon: string | null;
  order: number;
  children: NavigationData[];
  hidden: boolean;
};
