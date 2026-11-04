import { Lead, Deal, Customer, Task, Activity } from '../types/crm';

export const INITIAL_LEADS: Lead[] = [
  { id: 'LD-101', name: 'Alexander Vance', company: 'Apex Global Logistics', email: 'a.vance@apexglobal.com', phone: '+1 (555) 234-5678', value: 75000, status: 'Qualified', source: 'LinkedIn Inbound', assignedTo: 'Sarah Jenkins', createdAt: '2026-10-12' },
  { id: 'LD-102', name: 'Elena Rostova', company: 'Titan Quantum Labs', email: 'elena@titanquantum.io', phone: '+1 (555) 876-5432', value: 120000, status: 'Proposal', source: 'Tech Summit 2026', assignedTo: 'David Miller', createdAt: '2026-10-18' },
  { id: 'LD-103', name: 'Marcus Chen', company: 'Hyperion BioTech', email: 'm.chen@hyperion.org', phone: '+1 (555) 345-6789', value: 45000, status: 'Contacted', source: 'Website Demo', assignedTo: 'Sarah Jenkins', createdAt: '2026-10-22' },
  { id: 'LD-104', name: 'Sophia Sterling', company: 'Vanguard Capital', email: 'sterling@vanguardcap.com', phone: '+1 (555) 987-6543', value: 210000, status: 'Negotiation', source: 'Executive Referral', assignedTo: 'Alex Mercer', createdAt: '2026-10-05' },
  { id: 'LD-105', name: 'Liam O Connor', company: 'Kestrel Aero Dynamics', email: 'loconnor@kestrelaero.com', phone: '+1 (555) 456-7890', value: 85000, status: 'New', source: 'Organic Search', assignedTo: 'David Miller', createdAt: '2026-11-01' },
];

export const INITIAL_DEALS: Deal[] = [
  { id: 'DL-201', title: 'Enterprise Cloud Security Upgrade', company: 'Apex Global Logistics', contactName: 'Alexander Vance', amount: 75000, stage: 'In Negotiation', probability: 80, expectedClose: '2026-11-15', assignedTo: 'Sarah Jenkins' },
  { id: 'DL-202', title: 'AI Infrastructure Deployment', company: 'Titan Quantum Labs', contactName: 'Elena Rostova', amount: 120000, stage: 'Proposal Sent', probability: 60, expectedClose: '2026-11-30', assignedTo: 'David Miller' },
  { id: 'DL-203', title: 'SaaS Platform License Renewal', company: 'Vanguard Capital', contactName: 'Sophia Sterling', amount: 210000, stage: 'Contract Signed', probability: 95, expectedClose: '2026-11-10', assignedTo: 'Alex Mercer' },
  { id: 'DL-204', title: 'Data Analytics Integration', company: 'Hyperion BioTech', contactName: 'Marcus Chen', amount: 45000, stage: 'Discovery', probability: 30, expectedClose: '2026-12-15', assignedTo: 'Sarah Jenkins' },
  { id: 'DL-205', title: 'Fleet Tracking Module', company: 'Kestrel Aero Dynamics', contactName: 'Liam O Connor', amount: 85000, stage: 'Discovery', probability: 25, expectedClose: '2026-12-20', assignedTo: 'David Miller' },
  { id: 'DL-206', title: 'Cybersecurity Audit & Licensing', company: 'OmniCorp Tech', contactName: 'Rachel Green', amount: 60000, stage: 'Closed Won', probability: 100, expectedClose: '2026-10-31', assignedTo: 'Alex Mercer' },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'CUST-301', name: 'Sophia Sterling', company: 'Vanguard Capital', email: 'sterling@vanguardcap.com', phone: '+1 (555) 987-6543', industry: 'Financial Services', totalSpent: 340000, status: 'VIP', address: ' Wall Street, NY 10005', joinDate: '2024-03-15', lastContact: '2026-11-02', tags: ['Enterprise', 'High Priority', 'Renewed'] },
  { id: 'CUST-302', name: 'Rachel Green', company: 'OmniCorp Tech', email: 'rgreen@omnicorp.io', phone: '+1 (555) 654-3210', industry: 'Software Development', totalSpent: 125000, status: 'Active', address: 'Silicon Valley, CA 94025', joinDate: '2025-01-10', lastContact: '2026-10-31', tags: ['Key Account', 'SaaS'] },
  { id: 'CUST-303', name: 'David Kim', company: 'Nexus Robotics', email: 'dkim@nexusrobotics.com', phone: '+1 (555) 111-2233', industry: 'Automation & Hardware', totalSpent: 98000, status: 'Active', address: 'Austin, TX 78701', joinDate: '2025-06-20', lastContact: '2026-10-25', tags: ['Hardware', 'Quarterly Sync'] },
  { id: 'CUST-304', name: 'Hannah Abbott', company: 'BioHealth Systems', email: 'h.abbott@biohealth.org', phone: '+1 (555) 444-5566', industry: 'Healthcare', totalSpent: 42000, status: 'Inactive', address: 'Boston, MA 02108', joinDate: '2024-11-05', lastContact: '2026-08-14', tags: ['Lapsed', 'Re-engage'] },
];

export const INITIAL_TASKS: Task[] = [
  { id: 'TSK-401', title: 'Prepare Customized Security Proposal', dueDate: '2026-11-06', priority: 'High', status: 'In Progress', assignedTo: 'Sarah Jenkins', relatedTo: 'Apex Global Logistics', description: 'Include 3-tier SLA breakdown and hardware options.' },
  { id: 'TSK-402', title: 'Executive Sync with Sophia Sterling', dueDate: '2026-11-05', priority: 'Urgent', status: 'Pending', assignedTo: 'Alex Mercer', relatedTo: 'Vanguard Capital', description: 'Final contract signature review.' },
  { id: 'TSK-403', title: 'Schedule Product Demo Call', dueDate: '2026-11-08', priority: 'Medium', status: 'Pending', assignedTo: 'David Miller', relatedTo: 'Kestrel Aero Dynamics', description: 'Demonstrate AI reporting features.' },
  { id: 'TSK-404', title: 'Send Q4 Follow-up Survey', dueDate: '2026-11-12', priority: 'Low', status: 'Pending', assignedTo: 'Sarah Jenkins', relatedTo: 'OmniCorp Tech', description: 'Collect NPS scores.' },
];

export const INITIAL_ACTIVITIES: Activity[] = [
  { id: 'ACT-501', type: 'Call', title: 'Discovery Call Conducted', timestamp: '2026-11-04 09:30 AM', relatedEntity: 'Kestrel Aero Dynamics', performedBy: 'David Miller', details: 'Discussed cloud migration timelines. Client expressed strong interest in security package.', duration: '28 mins' },
  { id: 'ACT-502', type: 'Meeting', title: 'Proposal Review Meeting', timestamp: '2026-11-03 02:00 PM', relatedEntity: 'Titan Quantum Labs', performedBy: 'David Miller', details: 'Presented custom pricing structure. Waiting for CTO feedback.', duration: '45 mins' },
  { id: 'ACT-503', type: 'Email', title: 'Sent Revised SLA Agreement', timestamp: '2026-11-02 04:15 PM', relatedEntity: 'Vanguard Capital', performedBy: 'Alex Mercer', details: 'Attached updated indemnity clause as requested by legal team.' },
  { id: 'ACT-504', type: 'Follow-up', title: 'Q3 License Onboarding Check-in', timestamp: '2026-10-31 11:00 AM', relatedEntity: 'OmniCorp Tech', performedBy: 'Sarah Jenkins', details: 'Confirmed 100% seat adoption across engineering department.' },
];
