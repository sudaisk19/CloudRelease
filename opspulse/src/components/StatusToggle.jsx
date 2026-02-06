'use client';

import { useState, useTransition } from 'react';
import { updateIncidentStatus } from '@/lib/actions';
import { RefreshCw, CheckCircle, Search, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUS_OPTIONS = [
    { value: 'Open', label: 'Open', icon: AlertCircle, color: 'text-red-400' },
    { value: 'Investigating', label: 'Investigating', icon: Search, color: 'text-amber-400' },
    { value: 'Resolved', label: 'Resolved', icon: CheckCircle, color: 'text-emerald-400' },
];

export default function StatusToggle({ incidentId, currentStatus }) {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = (newStatus) => {
        if (newStatus === status) return;

        startTransition(async () => {
            const result = await updateIncidentStatus(incidentId, newStatus);
            if (!result.error) {
                setStatus(newStatus);
            }
        });
    };

    return (
        <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                Update Status
            </label>
            <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isActive = status === option.value;

                    return (
                        <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            disabled={isPending}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2.5 rounded-lg border font-medium transition-smooth',
                                isActive
                                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                                    : 'border-[var(--border)] bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]',
                                isPending && 'opacity-50 cursor-not-allowed'
                            )}
                        >
                            {isPending ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <Icon className={cn('w-4 h-4', isActive && option.color)} />
                            )}
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
