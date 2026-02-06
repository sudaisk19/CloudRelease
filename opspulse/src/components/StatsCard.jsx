import { cn } from '@/lib/utils';

export default function StatsCard({ title, value, icon: Icon, variant = 'default' }) {
    const variants = {
        default: 'border-[var(--border)]',
        critical: 'border-red-500/30 bg-red-500/5',
        warning: 'border-amber-500/30 bg-amber-500/5',
        success: 'border-emerald-500/30 bg-emerald-500/5',
    };

    const iconColors = {
        default: 'text-[var(--accent)]',
        critical: 'text-red-400',
        warning: 'text-amber-400',
        success: 'text-emerald-400',
    };

    return (
        <div
            className={cn(
                'p-5 rounded-xl border bg-[var(--background-secondary)] transition-smooth hover:bg-[var(--background-tertiary)]',
                variants[variant]
            )}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-1">{title}</p>
                    <p className="text-3xl font-bold text-[var(--foreground)]">{value}</p>
                </div>
                {Icon && (
                    <div className={cn('p-3 rounded-lg bg-[var(--background-tertiary)]', iconColors[variant])}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
            </div>
        </div>
    );
}
