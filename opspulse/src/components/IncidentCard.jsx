import Link from 'next/link';
import { Clock, Server, AlertTriangle, ChevronRight } from 'lucide-react';
import { cn, formatDate, getSeverityColor, getStatusColor } from '@/lib/utils';

export default function IncidentCard({ incident }) {
    const isCritical = incident.severity === 'Critical' && incident.status !== 'Resolved';

    return (
        <Link href={`/incidents/${incident._id}`}>
            <article
                className={cn(
                    'group relative p-5 rounded-xl border transition-smooth cursor-pointer',
                    'bg-[var(--background-secondary)] border-[var(--border)]',
                    'hover:bg-[var(--background-tertiary)] hover:border-[var(--accent)]/50',
                    'hover:shadow-lg hover:shadow-[var(--accent)]/5',
                    isCritical && 'critical-pulse border-red-500/50'
                )}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-smooth line-clamp-1">
                        {incident.title}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-smooth flex-shrink-0" />
                </div>

                {/* Description */}
                {incident.description && (
                    <p className="text-sm text-[var(--foreground-muted)] line-clamp-2 mb-4">
                        {incident.description}
                    </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {/* Service Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--background-tertiary)] text-[var(--foreground-muted)] text-xs font-medium">
                        <Server className="w-3 h-3" />
                        {incident.service}
                    </div>

                    {/* Severity Badge */}
                    <div
                        className={cn(
                            'flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium',
                            getSeverityColor(incident.severity)
                        )}
                    >
                        <AlertTriangle className="w-3 h-3" />
                        {incident.severity}
                    </div>

                    {/* Status Badge */}
                    <div
                        className={cn(
                            'px-2.5 py-1 rounded-md border text-xs font-medium',
                            getStatusColor(incident.status)
                        )}
                    >
                        {incident.status}
                    </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                    <Clock className="w-3 h-3" />
                    <time dateTime={incident.created_at}>
                        {formatDate(incident.created_at)}
                    </time>
                </div>

                {/* Critical indicator bar */}
                {isCritical && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-red-500 to-red-600" />
                )}
            </article>
        </Link>
    );
}
