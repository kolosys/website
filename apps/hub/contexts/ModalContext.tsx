"use client";

import React, { createContext, useCallback, useState, ReactNode } from "react";

export type ModalConfig = {
  id: string;
  title?: string;
  description?: string;
  content?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  onClose?: () => void;
  footer?: ReactNode;
  className?: string;
};

type ModalState = {
  modals: ModalConfig[];
};

type ModalContextValue = {
  modals: ModalConfig[];
  openModal: (config: Omit<ModalConfig, "id"> & { id?: string }) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  updateModal: (id: string, config: Partial<ModalConfig>) => void;
};

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({ modals: [] });

  const openModal = useCallback(
    (config: Omit<ModalConfig, "id"> & { id?: string }): string => {
      const id = config.id || `modal-${Date.now()}-${Math.random()}`;
      const newModal: ModalConfig = {
        id,
        size: "md",
        showCloseButton: true,
        closeOnOverlayClick: true,
        ...config,
      };
      
      setState((prev) => ({
        modals: [...prev.modals, newModal],
      }));
      
      return id;
    },
    []
  );

  const closeModal = useCallback((id: string) => {
    setState((prev) => {
      const modal = prev.modals.find((m) => m.id === id);
      if (modal?.onClose) {
        modal.onClose();
      }
      return {
        modals: prev.modals.filter((m) => m.id !== id),
      };
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setState((prev) => {
      prev.modals.forEach((modal) => {
        if (modal.onClose) {
          modal.onClose();
        }
      });
      return { modals: [] };
    });
  }, []);

  const updateModal = useCallback((id: string, config: Partial<ModalConfig>) => {
    setState((prev) => ({
      modals: prev.modals.map((m) =>
        m.id === id ? { ...m, ...config } : m
      ),
    }));
  }, []);

  const value: ModalContextValue = {
    modals: state.modals,
    openModal,
    closeModal,
    closeAllModals,
    updateModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

