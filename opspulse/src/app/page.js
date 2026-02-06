import { AlertCircle, CheckCircle2, Search, Activity, AlertTriangle } from 'lucide-react';
import dbConnect from '@/lib/db';
import Incident from '@/models/Incident';
import IncidentCard from '@/components/IncidentCard';
import StatsCard from '@/components/StatsCard';

async function getIncidents() {
  try {
    await dbConnect();
    const incidents = await Incident.find({}).sort({ created_at: -1 }).lean();
    // Convert MongoDB _id to string for serialization
    return incidents.map(incident => ({
      ...incident,
      _id: incident._id.toString(),
      created_at: incident.created_at.toISOString(),
    }));
  } catch (error) {
    console.error('Failed to fetch incidents:', error);
    return [];
  }
}

export default async function Dashboard() {
  const incidents = await getIncidents();

  // Calculate stats
  const openCount = incidents.filter(i => i.status === 'Open').length;
  const investigatingCount = incidents.filter(i => i.status === 'Investigating').length;
  const resolvedCount = incidents.filter(i => i.status === 'Resolved').length;
  const criticalCount = incidents.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Incident Dashboard
          </h1>
          <p className="text-[var(--foreground-muted)] mt-1">
            Monitor and manage active incidents across all services
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Open Incidents"
          value={openCount}
          icon={AlertCircle}
          variant="critical"
        />
        <StatsCard
          title="Investigating"
          value={investigatingCount}
          icon={Search}
          variant="warning"
        />
        <StatsCard
          title="Resolved"
          value={resolvedCount}
          icon={CheckCircle2}
          variant="success"
        />
        <StatsCard
          title="Critical"
          value={criticalCount}
          icon={AlertTriangle}
          variant={criticalCount > 0 ? 'critical' : 'default'}
        />
      </div>

      {/* Incidents Grid */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            All Incidents
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-[var(--background-tertiary)] text-[var(--foreground-muted)] text-sm">
            {incidents.length}
          </span>
        </div>

        {incidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--background-secondary)]">
            <div className="p-4 rounded-full bg-[var(--background-tertiary)] mb-4">
              <Activity className="w-8 h-8 text-[var(--foreground-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-1">
              No incidents logged
            </h3>
            <p className="text-[var(--foreground-muted)] text-center max-w-md">
              Your systems are running smoothly! Click "Log Incident" to report a new issue when needed.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {incidents.map((incident) => (
              <IncidentCard key={incident._id} incident={incident} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
