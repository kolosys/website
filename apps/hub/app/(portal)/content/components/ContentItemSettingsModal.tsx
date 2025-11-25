"use client";

import { useState } from "react";

type ContentItemData = {
    id: string;
    title: string;
    description: string | null;
    emoji: string | null;
    faIcon: string | null;
    status: string | null;
    version: string | null;
    slug: string[];
    filePath: string;
};

type ContentItemSettingsModalProps = {
    item: ContentItemData;
    repositoryId: string;
    onSave?: () => void;
    onClose?: () => void;
};

export default function ContentItemSettingsModal({
    item,
    repositoryId,
    onSave,
    onClose,
}: ContentItemSettingsModalProps) {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        emoji: item.emoji || "",
        faIcon: item.faIcon || "",
        status: item.status || "Stable",
        version: item.version || "",
        description: item.description || "",
    });

    const handleSave = async () => {
        setSaving(true);
        try {
            const { updateContentItem } = await import("@/app/actions/content");
            const result = await updateContentItem(item.id, formData);

            if (!result.success) {
                throw new Error(result.error || "Failed to update item");
            }

            if (onSave) {
                onSave();
            }
            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error("Error saving item settings:", error);
            alert("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Item Info */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Title
                        </label>
                        <p className="text-sm text-gray-900 mt-1">{item.title}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            File Path
                        </label>
                        <p className="text-sm text-gray-600 mt-1 font-mono">{item.filePath}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Slug
                        </label>
                        <p className="text-sm text-gray-600 mt-1 font-mono">
                            {item.slug.join(" / ")}
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Single emoji character to display for this item
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
                        placeholder="fa-file"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Font Awesome icon class name (e.g., fa-file, fa-book)
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Stable">Stable</option>
                        <option value="Beta">Beta</option>
                        <option value="Deprecated">Deprecated</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="version"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Version
                    </label>
                    <input
                        type="text"
                        id="version"
                        value={formData.version}
                        onChange={(e) =>
                            setFormData({ ...formData, version: e.target.value })
                        }
                        placeholder="1.0.0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        rows={3}
                        placeholder="Brief description of this content item"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
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

