'use client';

import Link from 'next/link';
import { Icon } from '@kolosys-sites/theme';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Kolosys Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center">
                <span className="text-neutral-900 font-bold text-xl">K</span>
              </div>
              <span className="text-xl font-bold text-white">Kolosys</span>
            </div>
            <p className="text-sm text-white mb-4">
              Building enterprise-grade Go libraries for high-performance applications.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/kolosys"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span
                  className="inline-block transition-colors duration-200"
                  style={{ color: 'rgb(107 114 128)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgb(255 255 255)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(107 114 128)';
                  }}
                >
                  <Icon pack="brands" name="github" size="sm" className='w-5 h-5' />
                </span>
              </Link>
              <Link
                href="/join-discord"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span
                  className="inline-block transition-colors duration-200"
                  style={{ color: 'rgb(107 114 128)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgb(255 255 255)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(107 114 128)';
                  }}
                >
                  <Icon pack="brands" name="discord-alt" size="sm" className='w-5 h-5' />
                </span>
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-neutral-500">© 2025 Kolosys. All rights reserved.</p>
            <div className="flex items-center gap-6 hidden">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">MIT License</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

