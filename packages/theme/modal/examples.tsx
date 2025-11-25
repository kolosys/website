"use client";

/**
 * Modal Framework Examples
 * 
 * This file contains example implementations of the modal framework.
 * These are for reference and can be used as templates in your application.
 */

import { useModalActions } from "@/hooks/useModal";

export function ModalExamples() {
  const {
    openModal,
    closeModal,
    openAlertModal,
    openConfirmModal,
  } = useModalActions();

  // Example 1: Basic Modal
  const openBasicModal = () => {
    const modalId = openModal({
      title: "Basic Modal",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            This is a basic modal with a title and content.
          </p>
        </div>
      ),
      footer: (
        <div className="flex justify-end gap-3">
          <button
            onClick={() => closeModal(modalId)}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      ),
    });
  };

  // Example 2: Success Alert
  const openSuccessAlert = () => {
    openAlertModal({
      title: "Success!",
      message: "Your changes have been saved successfully.",
      variant: "success",
      confirmText: "Great!",
      onConfirm: () => {
        console.log("Success alert dismissed");
      },
    });
  };

  // Example 3: Danger Alert
  const openDangerAlert = () => {
    openAlertModal({
      title: "Error Occurred",
      message: "Something went wrong. Please try again.",
      variant: "danger",
      confirmText: "Understood",
    });
  };

  // Example 4: Simple Confirmation
  const openSimpleConfirm = () => {
    openConfirmModal({
      title: "Confirm Action",
      message: "Are you sure you want to proceed with this action?",
      variant: "default",
      confirmText: "Yes, proceed",
      cancelText: "Cancel",
      onConfirm: async () => {
        // Perform action
        console.log("Action confirmed");
      },
      onCancel: () => {
        console.log("Action cancelled");
      },
    });
  };

  // Example 5: Dangerous Action Confirmation
  const openDangerConfirm = () => {
    openConfirmModal({
      title: "Delete Item",
      message: "This action cannot be undone. Are you sure you want to delete this item?",
      variant: "danger",
      confirmText: "Delete",
      cancelText: "Keep it",
      onConfirm: async () => {
        // Perform deletion
        console.log("Item deleted");
      },
    });
  };

  // Example 6: Typed Confirmation (for critical actions)
  const openTypedConfirm = () => {
    openConfirmModal({
      title: "Delete Repository",
      message: "This will permanently delete the repository and all its data, including commits, issues, and pull requests.",
      variant: "danger",
      confirmText: "Delete Repository",
      cancelText: "Cancel",
      requiresTyping: true,
      confirmationPhrase: "delete repository",
      onConfirm: async () => {
        // Perform critical deletion
        console.log("Repository deleted");
      },
    });
  };

  // Example 7: Large Modal with Form
  const openFormModal = () => {
    const modalId = openModal({
      title: "Create New Project",
      description: "Fill in the details to create a new project",
      size: "lg",
      content: (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              placeholder="My Awesome Project"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              placeholder="Describe your project..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visibility
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:border-gray-400">
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </form>
      ),
      footer: (
        <div className="flex justify-end gap-3">
          <button
            onClick={() => closeModal(modalId)}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Create project");
              closeModal(modalId);
            }}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Create Project
          </button>
        </div>
      ),
    });
  };

  // Example 8: Full-width Modal
  const openFullModal = () => {
    const modalId = openModal({
      title: "Preview",
      size: "full",
      content: (
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Full-width content area</p>
        </div>
      ),
      footer: (
        <div className="flex justify-end">
          <button
            onClick={() => closeModal(modalId)}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Close Preview
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Modal Framework Examples</h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={openBasicModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Basic Modal
        </button>

        <button
          onClick={openSuccessAlert}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Success Alert
        </button>

        <button
          onClick={openDangerAlert}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Danger Alert
        </button>

        <button
          onClick={openSimpleConfirm}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Simple Confirm
        </button>

        <button
          onClick={openDangerConfirm}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Danger Confirm
        </button>

        <button
          onClick={openTypedConfirm}
          className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
        >
          Typed Confirmation
        </button>

        <button
          onClick={openFormModal}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Form Modal
        </button>

        <button
          onClick={openFullModal}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Full-width Modal
        </button>
      </div>
    </div>
  );
}

