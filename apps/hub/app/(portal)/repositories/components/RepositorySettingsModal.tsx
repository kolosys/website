"use client";

import { useState, useEffect } from "react";
import { Button, Input, Switch, Fieldset, Legend, Description, Field, Label } from "@kolosys-sites/theme";

import { RepositoryData } from "@/lib/repositories";

type RepositorySettingsModalProps = {
    repository: RepositoryData;
    onSave?: () => void;
    onClose?: () => void;
};

export function RepositorySettingsModal({
    repository,
    onSave,
    onClose,
}: RepositorySettingsModalProps) {
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        emoji: "",
        faIcon: "",
        docsPath: "/docs",
        published: false,
        featured: false,
    });

    useEffect(() => {
        // Fetch all repository details to ensure we have the latest data
        const fetchDetails = async () => {
            try {
                const { getRepositoryDetails } = await import("@/app/actions/repositories");
                const result = await getRepositoryDetails(repository.id);
                if (result.success && result.data) {
                    setFormData({
                        emoji: result.data.emoji ?? "",
                        faIcon: result.data.faIcon ?? "",
                        docsPath: result.data.docsPath ?? "/docs",
                        published: result.data.published ?? false,
                        featured: result.data.featured ?? false,
                    });
                } else {
                    // Fallback to repository prop if fetch fails
                    setFormData({
                        emoji: repository.emoji ?? "",
                        faIcon: "",
                        docsPath: repository.docsPath ?? "/docs",
                        published: repository.published ?? false,
                        featured: repository.featured ?? false,
                    });
                }
            } catch (error) {
                console.error("Error fetching repository details:", error);
                // Fallback to repository prop on error
                setFormData({
                    emoji: repository.emoji ?? "",
                    faIcon: "",
                    docsPath: repository.docsPath ?? "/docs",
                    published: repository.published ?? false,
                    featured: repository.featured ?? false,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [repository.id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const { updateRepositoryAction } = await import("@/app/actions/repositories");
            const result = await updateRepositoryAction(repository.id, {
                emoji: formData.emoji || null,
                faIcon: formData.faIcon || null,
                docsPath: formData.docsPath,
                published: formData.published,
                featured: formData.featured,
            });

            if (!result.success) {
                throw new Error(result.error || "Failed to update repository settings");
            }

            // Call onSave callback before closing to allow parent to update state
            if (onSave) {
                await onSave();
            }
            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error("Error saving repository settings:", error);
            alert("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-600">Loading settings...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Repository Info */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                    <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Repository Name
                        </label>
                        <p className="text-sm font-medium text-gray-900 mt-1">{repository.name}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Full Name
                        </label>
                        <p className="text-sm text-gray-900 mt-1 font-mono">{repository.fullName}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Default Branch
                        </label>
                        <p className="text-sm text-gray-900 mt-1 font-mono">{repository.defaultBranch}</p>
                    </div>
                </div>
            </div>

            {/* Form Fields */}
            <Fieldset>
                <Legend>Repository Settings</Legend>

                <Field>
                    <Label>
                        Emoji
                    </Label>
                    <Input
                        type="text"
                        value={formData.emoji ?? ""}
                        onChange={(e) =>
                            setFormData({ ...formData, emoji: e.target.value })
                        }
                        placeholder="📦"
                        maxLength={2}
                    />
                    <Description>
                        Single emoji character to display for this repository
                    </Description>
                </Field>

                <Field>
                    <Label>Font Awesome Icon</Label>
                    <Input
                        type="text"
                        value={formData.faIcon ?? ""}
                        onChange={(e) =>
                            setFormData({ ...formData, faIcon: e.target.value })
                        }
                        placeholder="fa-box"
                    />
                    <Description>
                        Font Awesome icon class name (e.g., fa-box, fa-book)
                    </Description>
                </Field>

                <Field>
                    <Label>
                        Documentation Path
                    </Label>
                    <Input
                        type="text"
                        value={formData.docsPath ?? ""}
                        onChange={(e) =>
                            setFormData({ ...formData, docsPath: e.target.value })
                        }
                        placeholder="/docs"
                    />
                    <Description>
                        Path to the documentation directory in the repository
                    </Description>
                </Field>
            </Fieldset>

            <Fieldset>
                <Legend>Visibility Settings</Legend>

                <Field>
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <Label>
                                Published
                            </Label>
                            <Description>
                                When enabled, this repository will be visible on the public documentation site
                            </Description>
                        </div>
                        <Switch
                            checked={formData.published}
                            onChange={(checked) => setFormData({ ...formData, published: checked })}
                        />
                    </div>
                </Field>

                <Field>
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <Label>Featured</Label>
                            <Description>
                                When enabled, this repository will be featured on the marketing site
                            </Description>
                        </div>
                        <Switch
                            checked={formData.featured}
                            onChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                    </div>
                </Field>
            </Fieldset>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                    onClick={() => onClose?.()}
                    disabled={saving}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}

