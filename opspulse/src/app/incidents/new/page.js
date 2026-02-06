import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import IncidentForm from '@/components/IncidentForm';

export const metadata = {
    title: 'Log New Incident | OpsPulse',
    description: 'Report a new incident or outage in your infrastructure.',
};

export default function NewIncidentPage() {
    return (
        <div className="max-w-2xl mx-auto">
            {/* Back Link */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-smooth mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                    Log New Incident
                </h1>
                <p className="text-[var(--foreground-muted)]">
                    Document a new incident or outage for tracking and resolution.
                </p>
            </div>

            {/* Form Card */}
            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)]">
                <IncidentForm />
            </div>
        </div>
    );
}
