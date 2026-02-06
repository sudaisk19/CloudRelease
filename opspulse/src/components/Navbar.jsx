import Link from 'next/link';
import { Activity, Plus, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="glass border-b border-[var(--border)] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Activity className="w-8 h-8 text-[var(--accent)] transition-smooth group-hover:scale-110" />
                            <div className="absolute inset-0 bg-[var(--accent)] blur-lg opacity-30 group-hover:opacity-50 transition-smooth" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[var(--foreground)] to-[var(--foreground-muted)] bg-clip-text text-transparent">
                            OpsPulse
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)] transition-smooth"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <Link
                            href="/incidents/new"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-smooth font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Log Incident</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
