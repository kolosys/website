'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Icon } from '@kolosys-sites/theme';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const navItems = [
    { href: '/repositories', label: 'Repositories', icon: 'folder' as const, pack: 'basic' as const },
    { href: '/content', label: 'Content', icon: 'file' as const, pack: 'basic' as const },
    { href: '/issues', label: 'Issues', icon: 'alert-circle' as const, pack: 'basic' as const },
    { href: '/pull-requests', label: 'Pull Requests', icon: 'git' as const, pack: 'brands' as const },
    { href: '/settings', label: 'Settings', icon: 'cog' as const, pack: 'basic' as const },
  ];

  return (
    <aside className="w-64 bg-white flex flex-col border-r border-gray-200/60">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200/60 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-linear-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm leading-tight">Kolosys HUB</h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight">Source Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg transition-all duration-200 ${active
                  ? 'bg-gray-900 text-white font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                <Icon
                  name={item.icon}
                  pack={item.pack}
                  size="sm"
                  className={`shrink-0 transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-700'
                    }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="px-3 py-3 border-t border-gray-200/60 shrink-0 bg-gray-50/30">
        <h3 className="text-gray-400 uppercase tracking-wider mb-2.5 text-[10px] font-semibold px-2.5">
          Quick Stats
        </h3>
        <div className="space-y-2 text-xs">
          {[
            { label: 'Active Repositories', value: '5' },
            { label: 'Total Pages', value: '142' },
            { label: 'Open Issues', value: '11' },
            { label: 'Open PRs', value: '8' },
            { label: 'Last Sync', value: '2m ago' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between px-2.5">
              <span className="text-gray-500">{stat.label}</span>
              <span className="font-medium text-gray-900 tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="px-3 py-2.5 border-t border-gray-200/60 shrink-0 bg-gray-50/30">
        <div className="space-y-1 text-xs">
          <a
            href="/docs"
            className="block px-2.5 py-1.5 text-gray-500 hover:text-gray-900 transition-colors rounded-md hover:bg-white/60"
          >
            Documentation
          </a>
          <Button variant="outline" className="w-full" href="https://kolosys.com/join-discord" target='_blank' rel='noopener noreferrer'>
            <Icon pack="brands" name="discord-alt" size="xs" className="w-4 h-4" />
            <span>Join Discord</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}

