import type { NavigationData } from "@kolosys-sites/hub-client";
import type { NavItem } from "./nav";

export function transformNavigationToNavItems(
  navigationData: NavigationData[],
  baseUrl: string
): NavItem[] {
  return navigationData
    .map((item) => convertNavigationItem(item, baseUrl))
    .filter((item): item is NavItem => item !== null)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

function convertNavigationItem(
  nav: NavigationData,
  baseUrl: string
): NavItem | null {
  const hasChildren = nav.children && nav.children.length > 0;

  if (nav.hidden && !hasChildren) {
    return null;
  }

  const path = `${baseUrl}/${nav.slug.join("/")}`;
  const children = nav.children && nav.children.length > 0
    ? nav.children
        .map((child) => convertNavigationItem(child, baseUrl))
        .filter((child): child is NavItem => child !== null)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
    : undefined;

  return {
    title: nav.title,
    path,
    icon: nav.emoji || nav.faIcon || undefined,
    children,
    order: nav.order || 0,
    hasIndex: !nav.hidden,
  };
}

export function findPageInNav(
  items: NavigationData[],
  targetSlug: string[]
): NavigationData | null {
  for (const item of items) {
    if (JSON.stringify(item.slug) === JSON.stringify(targetSlug)) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      const found = findPageInNav(item.children, targetSlug);
      if (found) return found;
    }
  }
  return null;
}

export function getFirstChildPath(navItem: NavItem): string | null {
  if (!navItem.children || navItem.children.length === 0) {
    return navItem.path;
  }

  const sortedChildren = [...navItem.children].sort((a, b) => (a.order || 0) - (b.order || 0));
  const firstChild = sortedChildren[0];

  if (!firstChild) return navItem.path;

  if (firstChild.children && firstChild.children.length > 0 && !firstChild.hasIndex) {
    return getFirstChildPath(firstChild);
  }

  return firstChild.path;
}
