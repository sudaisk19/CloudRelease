import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this incident.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        maxlength: [2000, 'Description cannot be more than 2000 characters'],
        default: '',
    },
    service: {
        type: String,
        required: [true, 'Please specify the affected service.'],
        maxlength: [50, 'Service name cannot be more than 50 characters'],
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium',
    },
    status: {
        type: String,
        enum: ['Open', 'Investigating', 'Resolved'],
        default: 'Open',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Incident || mongoose.model('Incident', IncidentSchema);
