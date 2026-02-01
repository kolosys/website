"use client";

import { Card, Badge, Icon } from "@kolosys-sites/theme";

type NavNode = {
  id: string;
  projectId: string;
  parentId: string | null;
  slugPattern: string[];
  sortOrder: number;
  type: "page" | "group" | "link";
  customTitle: string | null;
  customEmoji: string | null;
  customIcon: string | null;
  externalUrl: string | null;
  hidden: boolean;
};

type NavigationPreviewProps = {
  data: NavNode[];
};

function PreviewNode({
  node,
  children,
  allNodes,
  level = 0,
}: {
  node: NavNode;
  children: NavNode[];
  allNodes: NavNode[];
  level?: number;
}) {
  const displayTitle =
    node.customTitle || node.slugPattern[node.slugPattern.length - 1] || "Untitled";
  const displayEmoji = node.customEmoji || (node.type === "page" ? "📄" : node.type === "group" ? "📁" : "🔗");

  return (
    <div className={`${level > 0 ? "ml-4" : ""}`}>
      <div
        className={`
          flex items-center gap-2 p-2 rounded
          ${node.hidden ? "opacity-50 bg-surface-emphasis/30" : "bg-surface-base"}
        `}
      >
        <span className="text-lg">{displayEmoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">{displayTitle}</span>
            {node.hidden && (
              <Icon name="eye-slash" pack="basic" size="sm" className="text-foreground-muted" />
            )}
          </div>
          {node.type === "link" && node.externalUrl && (
            <div className="text-xs text-foreground-muted truncate">
              {node.externalUrl}
            </div>
          )}
        </div>
        <Badge variant="info" size="sm">
          {node.type}
        </Badge>
      </div>

      {children.length > 0 && (
        <div className="mt-1 space-y-1">
          {children.map((child) => {
            const grandchildren = allNodes.filter((n) => n.parentId === child.id);
            return (
              <PreviewNode
                key={child.id}
                node={child}
                children={grandchildren}
                allNodes={allNodes}
                level={level + 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function NavigationPreview({ data }: NavigationPreviewProps) {
  const rootNodes = data
    .filter((node) => node.parentId === null)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (data.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-sm text-foreground-muted">
          Navigation preview will appear here
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="mb-3 pb-3 border-b border-surface-emphasis">
        <p className="text-xs text-foreground-muted">
          Read-only preview of how navigation will appear
        </p>
      </div>

      <div className="space-y-1">
        {rootNodes.map((node) => {
          const children = data
            .filter((n) => n.parentId === node.id)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          return (
            <PreviewNode key={node.id} node={node} children={children} allNodes={data} />
          );
        })}
      </div>
    </Card>
  );
}
