'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Tabs } from '@/components/ui/Tabs';

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState('Kolosys Documentation');
  const [platformUrl, setPlatformUrl] = useState('https://docs.kolosys.com');
  const [description, setDescription] = useState('Enterprise-grade documentation platform');
  const [showEmojis, setShowEmojis] = useState(true);
  const [showVersionBadges, setShowVersionBadges] = useState(true);
  const [enableSearch, setEnableSearch] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure your documentation platform settings, sync preferences, and integrations.
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        variant="underline"
        tabs={[
          {
            label: 'General',
            content: (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2>General Settings</h2>
                <p className="text-gray-600">General settings for the platform.</p>
                <div className="mt-6 text-center text-gray-500">
                  <p>General settings content coming soon...</p>
                </div>
              </div>
            ),
          },
          {
            label: 'Sync Settings',
            content: (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2>Sync Settings</h2>
                <p className="text-gray-600">Configure automatic sync schedules and webhook settings.</p>
                <div className="mt-6 text-center text-gray-500">
                  <p>Sync settings content coming soon...</p>
                </div>
              </div>
            ),
          },
          {
            label: 'Integrations',
            content: (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2>Integrations</h2>
                <p className="text-gray-600">Connect third-party services and tools.</p>
                <div className="mt-6 text-center text-gray-500">
                  <p>Integrations content coming soon...</p>
                </div>
              </div>
            ),
          },
          {
            label: 'Advanced',
            content: (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2>Advanced Settings</h2>
                <p className="text-gray-600">Advanced configuration options and danger zone.</p>
                <div className="mt-6 text-center text-gray-500">
                  <p>Advanced settings content coming soon...</p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

