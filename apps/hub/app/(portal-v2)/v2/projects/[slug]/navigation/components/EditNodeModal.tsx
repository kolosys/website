"use client";

import { useState } from "react";
import { Button, Icon } from "@kolosys-sites/theme";
import { NodeEditSidebar } from "./NodeEditSidebar";

type NavNode = {
  id: string;
  projectId: string;
  slugPattern: string[];
  type: "page" | "group" | "link";
  customTitle: string | null;
  customEmoji: string | null;
  externalUrl: string | null;
  hidden: boolean;
};

export function EditNodeButton({
  projectId,
  node,
}: {
  projectId: string;
  node: NavNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm" variant="outline">
        <Icon name="edit" pack="basic" size="sm" />
      </Button>
      <NodeEditSidebar
        node={{ ...node, projectId }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
