"use client";

import React, { useContext, useCallback } from "react";
import { ModalContext, ModalConfig } from "./ModalContext";

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}

export function useModalActions() {
  const { openModal, closeModal, closeAllModals, updateModal } = useModal();

  const openAlertModal = useCallback(
    (config: {
      title: string;
      message: string | React.ReactNode;
      confirmText?: string;
      onConfirm?: () => void;
      variant?: "default" | "danger" | "success";
    }) => {
      const modalId = openModal({
        title: config.title,
        content: (
          <div className="text-sm text-gray-600">{config.message}</div>
        ),
        footer: (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                if (config.onConfirm) {
                  config.onConfirm();
                }
                closeModal(modalId);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${config.variant === "danger"
                ? "bg-red-600 text-white hover:bg-red-700"
                : config.variant === "success"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
            >
              {config.confirmText || "OK"}
            </button>
          </div>
        ),
        size: "sm",
      });
      return modalId;
    },
    [openModal, closeModal]
  );

  const openConfirmModal = useCallback(
    (config: {
      title: string;
      message: string | React.ReactNode;
      confirmText?: string;
      cancelText?: string;
      requiresTyping?: boolean;
      confirmationPhrase?: string;
      onConfirm: () => void | Promise<void>;
      onCancel?: () => void;
      variant?: "default" | "danger";
    }) => {
      const modalId = openModal({
        title: config.title,
        content: (
          <div className="text-sm text-gray-600">{config.message}</div>
        ),
        footer: (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                if (config.onCancel) {
                  config.onCancel();
                }
                closeModal(modalId);
              }}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {config.cancelText || "Cancel"}
            </button>
            <button
              onClick={async () => {
                await config.onConfirm();
                closeModal(modalId);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${config.variant === "danger"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
            >
              {config.confirmText || "Confirm"}
            </button>
          </div>
        ),
        size: "sm",
        closeOnOverlayClick: false,
      });
      return modalId;
    },
    [openModal, closeModal]
  );

  return {
    openModal,
    closeModal,
    closeAllModals,
    updateModal,
    openAlertModal,
    openConfirmModal,
  };
}

