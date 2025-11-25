"use client";

import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "./Modal";

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
    icon: faCircleInfo,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  success: {
    icon: faCircleCheck,
    iconClass: "text-green-600",
    bgClass: "bg-green-50",
    buttonClass: "bg-green-600 hover:bg-green-700 text-white",
  },
  warning: {
    icon: faTriangleExclamation,
    iconClass: "text-yellow-600",
    bgClass: "bg-yellow-50",
    buttonClass: "bg-yellow-600 hover:bg-yellow-700 text-white",
  },
  danger: {
    icon: faCircleExclamation,
    iconClass: "text-red-600",
    bgClass: "bg-red-50",
    buttonClass: "bg-red-600 hover:bg-red-700 text-white",
  },
};

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
            <FontAwesomeIcon
              icon={config.icon}
              className={`h-6 w-6 ${config.iconClass}`}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <div className="text-sm text-gray-600">{message}</div>
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
