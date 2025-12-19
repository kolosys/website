'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faGrip,
  faCircleInfo,
  faCodePullRequest,
  faCog,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-64 bg-white flex flex-col border-r border-gray-200">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">K</span>
          </div>
          <div>
            <h2>Kolosys HUB</h2>
            <p className="text-xs text-gray-500">Source Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/repositories"
              className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-colors ${isActive('/repositories')
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <FontAwesomeIcon icon={faFolder} className="w-5 h-5" />
              <span>Repositories</span>
            </Link>
          </li>
          <li>
            <Link
              href="/content"
              className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-colors ${isActive('/content')
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <FontAwesomeIcon icon={faFile} className="w-5 h-5" />
              <span>Content Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/issues"
              className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-colors ${isActive('/issues')
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5" />
              <span>Issues</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pull-requests"
              className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-colors ${isActive('/pull-requests')
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <FontAwesomeIcon icon={faCodePullRequest} className="w-5 h-5" />
              <span>Pull Requests</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-colors ${isActive('/settings')
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-gray-500 uppercase mb-3">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Active Repositories</span>
            <span className="font-semibold text-gray-900">5</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Pages</span>
            <span className="font-semibold text-gray-900">142</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Open Issues</span>
            <span className="font-semibold text-gray-900">11</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Open PRs</span>
            <span className="font-semibold text-gray-900">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Last Sync</span>
            <span className="font-semibold text-gray-900">2m ago</span>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1 text-sm">
          <a href="/docs" className="block text-gray-600 hover:text-gray-900 transition-colors">
            Documentation
          </a>
          <a href="/support" className="block text-gray-600 hover:text-gray-900 transition-colors">
            Support
          </a>
        </div>
      </div>
    </aside>
  );
}

