"use client";

import { Button, Icon } from "@kolosys-sites/theme";

type PendingChangesProps = {
  onSave: () => void;
  onDiscard: () => void;
  isSaving: boolean;
};

export function PendingChanges({ onSave, onDiscard, isSaving }: PendingChangesProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-warning-surface border-2 border-warning text-warning-foreground rounded-lg shadow-lg p-4 flex items-center gap-4 min-w-96">
      <Icon name="alert-triangle" pack="basic" size="md" className="text-warning" />
      <div className="flex-1">
        <div className="font-semibold">Unsaved Changes</div>
        <div className="text-sm opacity-90">
          You have pending changes to the navigation structure
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onDiscard}
          disabled={isSaving}
        >
          Discard
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Icon name="check" pack="basic" size="sm" className="mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
