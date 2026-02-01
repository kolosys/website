"use client";

import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ModalConfig } from "./ModalContext";
import { Button, cn } from "@kolosys-sites/theme";
import { Icon } from "../components/Icon";

type ModalProps = Omit<ModalConfig, "id"> & {
  isOpen: boolean;
  onClose: () => void;
};

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  content,
  footer,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  const handleClose = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={handleClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-surface/30 backdrop-blur-xs" />
        </TransitionChild>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={cn(
                  "w-full transform rounded-lg bg-panel shadow-sm-xl border border-divider transition-all max-h-[90vh] overflow-y-auto",
                  sizeClasses[size],
                  className
                )}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="flex items-start justify-between border-b border-divider px-6 py-4">
                    <div className="flex-1">
                      {title && (
                        <DialogTitle as="h4" className="m-0">
                          {title}
                        </DialogTitle>
                      )}
                      {description && (
                        <p className="mt-1 text-sm">
                          {description}
                        </p>
                      )}
                    </div>
                    {showCloseButton && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <Icon name="x" pack="basic" size="sm" />
                      </Button>
                    )}
                  </div>
                )}

                {/* Content */}
                {content && (
                  <div className="px-6 py-4">
                    {content}
                  </div>
                )}

                {/* Footer */}
                {footer && (
                  <div className="border-t border-divider bg-subtle px-6 py-4">
                    {footer}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
