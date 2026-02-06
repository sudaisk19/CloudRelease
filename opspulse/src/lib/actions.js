'use server';

import dbConnect from '@/lib/db';
import Incident from '@/models/Incident';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createIncident(formData) {
    try {
        await dbConnect();

        const incidentData = {
            title: formData.get('title'),
            description: formData.get('description') || '',
            service: formData.get('service'),
            severity: formData.get('severity'),
            status: 'Open',
        };

        await Incident.create(incidentData);

        revalidatePath('/');
    } catch (error) {
        console.error('Failed to create incident:', error);
        return { error: 'Failed to create incident. Please try again.' };
    }

    redirect('/');
}

export async function updateIncidentStatus(incidentId, newStatus) {
    try {
        await dbConnect();

        await Incident.findByIdAndUpdate(incidentId, { status: newStatus });

        revalidatePath('/');
        revalidatePath(`/incidents/${incidentId}`);

        return { success: true };
    } catch (error) {
        console.error('Failed to update incident status:', error);
        return { error: 'Failed to update status. Please try again.' };
    }
}

export async function deleteIncident(incidentId) {
    try {
        await dbConnect();

        await Incident.findByIdAndDelete(incidentId);

        revalidatePath('/');
    } catch (error) {
        console.error('Failed to delete incident:', error);
        return { error: 'Failed to delete incident. Please try again.' };
    }

    redirect('/');
}
