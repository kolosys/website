"use client";

import React, { ReactNode, useState } from "react";
import { Modal } from "./Modal";
import { Icon } from "../components/Icon";

type ConfirmVariant = "default" | "danger";

type ModalConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string | ReactNode;
  variant?: ConfirmVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  requiresTyping?: boolean;
  confirmationPhrase?: string;
};

const variantConfig = {
  default: {
    icon: "alert-circle",
    iconClass: "text-neutral-600",
    bgClass: "bg-neutral-100",
    buttonClass: "bg-neutral-900 hover:bg-neutral-900/90 text-white",
  },
  danger: {
    icon: "alert-circle",
    iconClass: "text-error-600",
    bgClass: "bg-error-50",
    buttonClass: "bg-error-600 hover:bg-error-600/90 text-white",
  },
} as const;

export function ModalConfirm({
  isOpen,
  onClose,
  title,
  message,
  variant = "default",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  requiresTyping = false,
  confirmationPhrase = "confirm",
}: ModalConfirmProps) {
  const config = variantConfig[variant];
  const [inputValue, setInputValue] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const isConfirmEnabled = requiresTyping
    ? inputValue === confirmationPhrase
    : true;

  const handleConfirm = async () => {
    if (!isConfirmEnabled || isConfirming) return;

    setIsConfirming(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsConfirming(false);
      setInputValue("");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setInputValue("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      size="sm"
      showCloseButton={true}
      closeOnOverlayClick={false}
      content={
        <div className="space-y-4">
          <div className="flex gap-4">
            <div
              className={`shrink-0 rounded-full p-3 ${config.bgClass}`}
            >
              <Icon
                name={config.icon}
                pack="basic"
                size="lg"
                className={config.iconClass}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-foreground mb-2">
                {title}
              </h3>
              <div className="text-sm text-body">{message}</div>
            </div>
          </div>

          {requiresTyping && (
            <div>
              <label
                htmlFor="confirmation-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Type <span className="font-semibold">{confirmationPhrase}</span>{" "}
                to confirm:
              </label>
              <input
                id="confirmation-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 border border-divider rounded-md shadow-sm-xs focus:outline-hidden focus:ring-2 focus:ring-focus-ring focus:border-focus-ring text-sm"
                placeholder={confirmationPhrase}
                autoComplete="off"
              />
            </div>
          )}
        </div>
      }
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            disabled={isConfirming}
            className="px-4 py-2 rounded-md text-sm font-medium text-foreground bg-panel border border-divider hover:bg-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmEnabled || isConfirming}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonClass}`}
          >
            {isConfirming ? "Confirming..." : confirmText}
          </button>
        </div>
      }
    />
  );
}
