'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FilePlus, Eye, BookOpen } from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'All Posts', icon: LayoutDashboard },
  { href: '/dashboard/new', label: 'Add New', icon: FilePlus },
  { href: '/preview', label: 'Preview', icon: Eye },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#282318] text-[#eeebe3] flex flex-col sticky top-0">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-[#3d3325]">
        <div className="flex items-center gap-3">
          <BookOpen size={22} className="text-[#c84b31]" />
          <div>
            <div className="font-display text-lg font-semibold leading-tight tracking-wide">Article</div>
            <div className="font-mono text-[10px] text-[#b0a384] tracking-[0.2em] uppercase">Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4">
        <p className="px-4 mb-4 text-[10px] font-mono tracking-[0.2em] uppercase text-[#b0a384]">Menu</p>
        <ul className="space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-body transition-all duration-200
                    ${active
                      ? 'bg-[#c84b31] text-white'
                      : 'text-[#c8bfa8] hover:bg-[#3d3325] hover:text-[#eeebe3]'
                    }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-[#3d3325]">
        <p className="text-[10px] font-mono text-[#6e624b] tracking-wider">v1.0.0</p>
      </div>
    </aside>
  );
}
