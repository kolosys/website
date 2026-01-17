export interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
  order?: number;
  icon?: string;
  hasIndex?: boolean;
}
