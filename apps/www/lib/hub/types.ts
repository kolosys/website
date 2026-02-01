export type LibraryData = {
  id: string;
  name: string;
  fullName: string;
  description: string;
  emoji: string | null;
  faIcon: string | null;
  baseSlug: string | null;
  pages: number;
  lastSync: string;
  syncing: boolean;
  status: string;
  latestTag: string | null;
  featured: boolean;
  published: boolean;
  topics: string[];
  stargazersCount: number;
};

export type LibraryPage = {
  page: PageData;
  navigation: NavigationData[];
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
