export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export type DealStage = 'Discovery' | 'Proposal Sent' | 'In Negotiation' | 'Contract Signed' | 'Closed Won' | 'Closed Lost';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Deferred';
export type ActivityType = 'Call' | 'Meeting' | 'Email' | 'Note' | 'Follow-up';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  status: LeadStatus;
  source: string;
  assignedTo: string;
  createdAt: string;
  notes?: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  contactName: string;
  amount: number;
  stage: DealStage;
  probability: number;
  expectedClose: string;
  assignedTo: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  totalSpent: number;
  status: 'Active' | 'Inactive' | 'VIP';
  address: string;
  joinDate: string;
  lastContact: string;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  relatedTo: string; // Lead or Customer name
  description?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: string;
  relatedEntity: string;
  performedBy: string;
  details: string;
  duration?: string;
}

export type ViewTab = 'dashboard' | 'leads' | 'pipeline' | 'customers' | 'tasks' | 'activities';
