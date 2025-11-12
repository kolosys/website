import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-xl font-bold text-black">Kolosys</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#libraries" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Libraries
              </Link>
              <Link href="#community" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Community
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Link 
              href="https://github.com/kolosys" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

