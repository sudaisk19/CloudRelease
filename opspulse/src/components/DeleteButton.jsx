'use client';

import { useState, useTransition } from 'react';
import { deleteIncident } from '@/lib/actions';
import { Trash2, Loader2, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeleteButton({ incidentId, incidentTitle }) {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            await deleteIncident(incidentId);
        });
    };

    if (showConfirm) {
        return (
            <div className="flex-1 p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-[var(--foreground)] mb-1">
                            Delete Incident?
                        </h3>
                        <p className="text-sm text-[var(--foreground-muted)] mb-3">
                            This will permanently delete "{incidentTitle}". This action cannot be undone.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDelete}
                                disabled={isPending}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium transition-smooth hover:bg-red-600',
                                    isPending && 'opacity-50 cursor-not-allowed'
                                )}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Confirm Delete
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                disabled={isPending}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground-muted)] font-medium transition-smooth hover:bg-[var(--background-secondary)]"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                Danger Zone
            </label>
            <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/50 text-red-400 font-medium transition-smooth hover:bg-red-500/10 hover:border-red-500"
            >
                <Trash2 className="w-4 h-4" />
                Delete Incident
            </button>
        </div>
    );
}
