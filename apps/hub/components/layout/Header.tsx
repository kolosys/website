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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const { openModal, closeModal } = useModalActions();

  const filteredSuggestions = searchQuery === ''
    ? []
    : SEARCH_SUGGESTIONS.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
          {/* <Combobox value={selectedItem} onChange={setSelectedItem}>
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10"
              />
              <ComboboxInput
                placeholder="Search documentation..."
                onChange={(e) => setSearchQuery(e.target.value)}
                displayValue={(item: any) => item?.name || ''}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-hidden transition-all"
              />
              {filteredSuggestions.length > 0 && (
                <ComboboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-sm-lg border border-gray-200 focus:outline-hidden">
                  {filteredSuggestions.map((item) => (
                    <ComboboxOption
                      key={item.id}
                      value={item}
                      className="relative cursor-pointer select-none py-2.5 pl-10 pr-4 text-gray-900 data-focus:bg-blue-50 transition-colors"
                    >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl">
                        {item.icon}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="block truncate">{item.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{item.category}</span>
                      </div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox> */}
        </div>

        {/* Right Container - Actions */}
        <div className="flex items-center space-x-3 ml-6">
          <Button variant='outline'>
            Sync All Docs
          </Button>
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

