"use client";

import React from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "./Modal";

export function ModalContainer() {
  const { modals, closeModal } = useModal();

  return (
    <>
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          isOpen={true}
          onClose={() => closeModal(modal.id)}
          title={modal.title}
          description={modal.description}
          content={modal.content}
          footer={modal.footer}
          size={modal.size}
          showCloseButton={modal.showCloseButton}
          closeOnOverlayClick={modal.closeOnOverlayClick}
          className={modal.className}
        />
      ))}
    </>
  );
}
