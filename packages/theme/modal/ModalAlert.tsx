"use client";

import React, { ReactNode } from "react";
import { Modal } from "./Modal";
import { Icon } from "../components/Icon";

type AlertVariant = "info" | "success" | "warning" | "danger";

type ModalAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string | ReactNode;
  variant?: AlertVariant;
  confirmText?: string;
  onConfirm?: () => void | Promise<void>;
};

const variantConfig = {
  info: {
    icon: "info-circle",
    iconClass: "text-primary-emphasis",
    bgClass: "bg-primary-base",
    buttonClass: "bg-primary-emphasis hover:bg-primary-emphasis/90 text-white",
  },
  success: {
    icon: "check-circle",
    iconClass: "text-success-600",
    bgClass: "bg-success-50",
    buttonClass: "bg-success-600 hover:bg-success-600/90 text-white",
  },
  warning: {
    icon: "alert-triangle",
    iconClass: "text-accent-emphasis",
    bgClass: "bg-accent-base",
    buttonClass: "bg-accent-emphasis hover:bg-accent-emphasis/90 text-white",
  },
  danger: {
    icon: "alert-circle",
    iconClass: "text-error-600",
    bgClass: "bg-error-50",
    buttonClass: "bg-error-600 hover:bg-error-600/90 text-white",
  },
} as const;

export function ModalAlert({
  isOpen,
  onClose,
  title,
  message,
  variant = "info",
  confirmText = "OK",
  onConfirm,
}: ModalAlertProps) {
  const config = variantConfig[variant];

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={false}
      content={
        <div className="flex gap-4">
          <div className={`shrink-0 rounded-full p-3 ${config.bgClass}`}>
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
      }
      footer={
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${config.buttonClass}`}
          >
            {confirmText}
          </button>
        </div>
      }
    />
  );
}
