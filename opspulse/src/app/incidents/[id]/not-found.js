import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="p-4 rounded-full bg-amber-500/10 mb-6">
                <AlertTriangle className="w-12 h-12 text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                Incident Not Found
            </h1>
            <p className="text-[var(--foreground-muted)] max-w-md mb-8">
                The incident you're looking for doesn't exist or may have been deleted.
            </p>
            <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-smooth"
            >
                <Home className="w-5 h-5" />
                Back to Dashboard
            </Link>
        </div>
    );
}
