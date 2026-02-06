import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * @param  {...any} inputs - Class names to merge
 * @returns {string} - Merged class string
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date to a human-readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Get severity color classes based on severity level
 * @param {string} severity - Severity level
 * @returns {string} - Tailwind CSS classes
 */
export function getSeverityColor(severity) {
    const colors = {
        Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
        Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
        High: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
        Critical: 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    return colors[severity] || colors.Medium;
}

/**
 * Get status color classes based on status
 * @param {string} status - Status value
 * @returns {string} - Tailwind CSS classes
 */
export function getStatusColor(status) {
    const colors = {
        Open: 'bg-red-500/20 text-red-400 border-red-500/50',
        Investigating: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
        Resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    };
    return colors[status] || colors.Open;
}
