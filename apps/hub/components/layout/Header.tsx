'use client';

import { useModalActions } from "@kolosys-sites/theme/modal";
import { AddRepositoryModalContent } from '@/components/AddRepositoryModal';
import dynamic from "next/dynamic"
import { Button, Icon } from '@kolosys-sites/theme';

const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

export default function Header() {
  const { openModal, closeModal } = useModalActions();

  const handleAddRepository = () => {
    const modalId = openModal({
      title: "Add Repository",
      description: "Select a repository from the Kolosys organization to add to your hub",
      size: "lg",
      content: (
        <AddRepositoryModalContent
          onClose={() => closeModal(modalId)}
          onSuccess={() => {
            closeModal(modalId);
            window.location.reload();
          }}
        />
      ),
    });
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm supports-backdrop-filter:bg-white/60">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Search Bar - Left Side */}
        <div className="flex-1 max-w-md">
        </div>

        {/* Right Container - Actions */}
        <div className="flex items-center gap-3 ml-6">
          <Button
            onClick={handleAddRepository}
          >
            <Icon name="plus" pack="basic" size="xs" className="w-4 h-4" />
            <span>Add Repository</span>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

