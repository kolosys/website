"use client";

import { useState } from "react";

type GroupIndexData = {
  id: string;
  title: string;
  description: string | null;
  emoji: string | null;
  faIcon: string | null;
  hidden: boolean;
  slug: string[];
  filePath: string;
};

type GroupSettingsModalProps = {
  group: GroupIndexData;
  repositoryId: string;
  onSave?: () => void;
  onClose?: () => void;
};

export default function GroupSettingsModal({
  group,
  repositoryId,
  onSave,
  onClose,
}: GroupSettingsModalProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    emoji: group.emoji || "",
    faIcon: group.faIcon || "",
    hidden: group.hidden,
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const { updateContentGroup } = await import("@/app/actions/content");
      const result = await updateContentGroup(
        group.slug[0],
        repositoryId,
        formData
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to update group settings");
      }

      if (onSave) {
        onSave();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving group settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Group Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-2">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Group Name
            </label>
            <p className="text-sm text-gray-900 mt-1">{group.title}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              File Path
            </label>
            <p className="text-sm text-gray-600 mt-1 font-mono">{group.filePath}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Slug
            </label>
            <p className="text-sm text-gray-600 mt-1 font-mono">
              {group.slug.join(" / ")}
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="emoji"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Emoji
          </label>
          <input
            type="text"
            id="emoji"
            value={formData.emoji}
            onChange={(e) =>
              setFormData({ ...formData, emoji: e.target.value })
            }
            placeholder="📄"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Single emoji character to display for this group
          </p>
        </div>

        <div>
          <label
            htmlFor="faIcon"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Font Awesome Icon
          </label>
          <input
            type="text"
            id="faIcon"
            value={formData.faIcon}
            onChange={(e) =>
              setFormData({ ...formData, faIcon: e.target.value })
            }
            placeholder="fa-folder"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Font Awesome icon class name (e.g., fa-folder, fa-book)
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.hidden}
              onChange={(e) =>
                setFormData({ ...formData, hidden: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Hidden from documentation
            </span>
          </label>
          <p className="mt-1 text-xs text-gray-500">
            When enabled, this group index will be hidden from the documentation site
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

