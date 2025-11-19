"use client";

import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { ModalConfig } from "@/contexts/ModalContext";

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
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
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
                  "w-full transform overflow-hidden rounded-lg bg-white shadow-xl transition-all",
                  sizeClasses[size],
                  className
                )}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
                    <div className="flex-1">
                      {title && (
                        <DialogTitle
                          as="h3"
                          className="text-lg font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </DialogTitle>
                      )}
                      {description && (
                        <p className="mt-1 text-sm text-gray-600">
                          {description}
                        </p>
                      )}
                    </div>
                    {showCloseButton && (
                      <button
                        type="button"
                        className="ml-4 inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                      </button>
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
                  <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
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
