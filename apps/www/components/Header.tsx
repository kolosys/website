import Link from 'next/link';
import { Icon } from '@kolosys-sites/theme';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-panel/95 backdrop-blur-sm supports-backdrop-filter:bg-panel/60">
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
              <Link href="#libraries" className="text-sm font-medium text-neutral-700 hover:text-foreground transition-colors">
                Libraries
              </Link>
              <Link href="#community" className="text-sm font-medium text-neutral-700 hover:text-foreground transition-colors">
                Community
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="https://github.com/kolosys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-foreground transition-colors"
            >
              <Icon pack="brands" name="github" size="sm" className="w-5 h-5" />
            </Link>
            <Link href="/join-discord" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-foreground transition-colors">
              <Icon pack="brands" name="discord-alt" size="sm" className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

