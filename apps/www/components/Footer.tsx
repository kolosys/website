import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faXTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Kolosys Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">K</span>
              </div>
              <span className="text-xl font-bold text-white">Kolosys</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Building enterprise-grade Go libraries for high-performance applications.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/kolosys" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5 hover:text-white transition-colors" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" className="hidden">
                <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5 hover:text-white transition-colors" />
              </Link>
              <Link href="/join-discord" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDiscord} className="w-5 h-5 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 Kolosys. All rights reserved.</p>
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

