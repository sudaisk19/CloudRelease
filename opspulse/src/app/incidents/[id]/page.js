import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Server, AlertTriangle, FileText } from 'lucide-react';
import dbConnect from '@/lib/db';
import Incident from '@/models/Incident';
import { formatDate, getSeverityColor, getStatusColor, cn } from '@/lib/utils';
import StatusToggle from '@/components/StatusToggle';
import DeleteButton from '@/components/DeleteButton';

async function getIncident(id) {
    try {
        await dbConnect();
        const incident = await Incident.findById(id).lean();

        if (!incident) return null;

        return {
            ...incident,
            _id: incident._id.toString(),
            created_at: incident.created_at.toISOString(),
        };
    } catch (error) {
        console.error('Failed to fetch incident:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const incident = await getIncident(id);

    if (!incident) {
        return { title: 'Incident Not Found | OpsPulse' };
    }

    return {
        title: `${incident.title} | OpsPulse`,
        description: incident.description || `${incident.severity} incident in ${incident.service}`,
    };
}

export default async function IncidentDetailPage({ params }) {
    const { id } = await params;
    const incident = await getIncident(id);

    if (!incident) {
        notFound();
    }

    const isCritical = incident.severity === 'Critical' && incident.status !== 'Resolved';

    return (
        <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-smooth mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Main Card */}
            <div
                className={cn(
                    'rounded-xl border bg-[var(--background-secondary)] overflow-hidden',
                    isCritical ? 'border-red-500/50 critical-pulse' : 'border-[var(--border)]'
                )}
            >
                {/* Header */}
                <div className="p-6 border-b border-[var(--border)]">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <h1 className="text-2xl font-bold text-[var(--foreground)]">
                            {incident.title}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div
                                className={cn(
                                    'px-3 py-1.5 rounded-lg border text-sm font-medium',
                                    getSeverityColor(incident.severity)
                                )}
                            >
                                <div className="flex items-center gap-1.5">
                                    <AlertTriangle className="w-4 h-4" />
                                    {incident.severity}
                                </div>
                            </div>
                            <div
                                className={cn(
                                    'px-3 py-1.5 rounded-lg border text-sm font-medium',
                                    getStatusColor(incident.status)
                                )}
                            >
                                {incident.status}
                            </div>
                        </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)]">
                        <div className="flex items-center gap-1.5">
                            <Server className="w-4 h-4" />
                            <span>{incident.service}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <time dateTime={incident.created_at}>
                                {formatDate(incident.created_at)}
                            </time>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="p-6 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-[var(--accent)]" />
                        <h2 className="text-lg font-semibold text-[var(--foreground)]">
                            Description
                        </h2>
                    </div>
                    {incident.description ? (
                        <p className="text-[var(--foreground-muted)] whitespace-pre-wrap leading-relaxed">
                            {incident.description}
                        </p>
                    ) : (
                        <p className="text-[var(--foreground-muted)] italic">
                            No description provided.
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="p-6 bg-[var(--background-tertiary)]">
                    <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                        Actions
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <StatusToggle incidentId={incident._id} currentStatus={incident.status} />
                        <DeleteButton incidentId={incident._id} incidentTitle={incident.title} />
                    </div>
                </div>
            </div>
        </div>
    );
}
