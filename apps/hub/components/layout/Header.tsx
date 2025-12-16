'use client';

import { useState } from 'react';
import { useModalActions } from "@kolosys-sites/theme/modal";
import { AddRepositoryModalContent } from '@/components/AddRepositoryModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import dynamic from "next/dynamic"
import { Button } from '@kolosys-sites/theme';

// Mock search suggestions
const SEARCH_SUGGESTIONS = [
  { id: 1, name: 'Getting Started with Ion', category: 'Documentation', icon: '📄' },
  { id: 2, name: 'API Reference', category: 'Documentation', icon: '📚' },
  { id: 3, name: 'Installation Guide', category: 'Documentation', icon: '📦' },
  { id: 4, name: 'Nova Configuration', category: 'Documentation', icon: '⚙️' },
  { id: 5, name: 'TimeCapsule Usage', category: 'Documentation', icon: '⏰' },
  { id: 6, name: 'Repositories', category: 'Navigation', icon: '📁' },
  { id: 7, name: 'Settings', category: 'Navigation', icon: '⚙️' },
  { id: 8, name: 'Issues', category: 'Navigation', icon: '🐛' },
];

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
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search Bar - Left Side */}
        <div className="flex-1 max-w-md">
        </div>

        {/* Right Container - Actions */}
        <div className="flex items-center space-x-3 ml-6">
          <Button
            onClick={handleAddRepository}
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
            <span>Add Repository</span>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

