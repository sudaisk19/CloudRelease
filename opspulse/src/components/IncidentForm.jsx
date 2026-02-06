'use client';

import { useFormStatus } from 'react-dom';
import { createIncident } from '@/lib/actions';
import { Send, Loader2 } from 'lucide-react';

const SERVICES = [
    'Auth Service',
    'Payment Gateway',
    'API Gateway',
    'Database',
    'VPC Network',
    'CDN',
    'Load Balancer',
    'Storage',
    'Kubernetes',
    'CI/CD Pipeline',
    'Monitoring',
    'Other',
];

const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging Incident...
                </>
            ) : (
                <>
                    <Send className="w-5 h-5" />
                    Log Incident
                </>
            )}
        </button>
    );
}

export default function IncidentForm() {
    return (
        <form action={createIncident} className="space-y-6">
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                    Incident Title <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    maxLength={100}
                    placeholder="e.g., Database connection timeout on Auth Service"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] transition-smooth"
                />
            </div>

            {/* Service */}
            <div>
                <label
                    htmlFor="service"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                    Affected Service <span className="text-red-400">*</span>
                </label>
                <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)] focus:border-[var(--accent)] transition-smooth cursor-pointer"
                >
                    <option value="">Select a service...</option>
                    {SERVICES.map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>
            </div>

            {/* Severity */}
            <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                    Severity Level <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SEVERITIES.map((severity) => (
                        <label
                            key={severity}
                            className="relative cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="severity"
                                value={severity}
                                required
                                className="peer sr-only"
                            />
                            <div className={`
                px-4 py-3 rounded-lg border text-center font-medium transition-smooth
                border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground-muted)]
                peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)]/10 peer-checked:text-[var(--accent)]
                hover:border-[var(--accent)]/50
              `}>
                                {severity}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    maxLength={2000}
                    placeholder="Provide details about the incident, impact, and any initial observations..."
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] transition-smooth resize-none"
                />
                <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                    Optional. You can add post-mortem details later.
                </p>
            </div>

            {/* Submit */}
            <SubmitButton />
        </form>
    );
}
