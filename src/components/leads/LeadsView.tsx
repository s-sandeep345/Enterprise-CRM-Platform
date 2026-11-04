import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addLead, updateLead, deleteLead, setFilterStatus, setSearchQuery } from '../../store/slices/leadsSlice';
import { Lead, LeadStatus } from '../../types/crm';
import { Search, Filter, Plus, Trash2, Edit3, Mail, Phone, Building2 } from 'lucide-react';

export const LeadsView: React.FC = () => {
  const dispatch = useDispatch();
  const { leads, filterStatus, searchQuery } = useSelector((state: RootState) => state.leads);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: 50000,
    status: 'New' as LeadStatus,
    source: 'Website',
    assignedTo: 'Sarah Jenkins',
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      dispatch(updateLead({ ...editingLead, ...formData }));
    } else {
      dispatch(addLead(formData));
    }
    setModalOpen(false);
    setEditingLead(null);
  };

  const openEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      value: lead.value,
      status: lead.status,
      source: lead.source,
      assignedTo: lead.assignedTo,
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter leads by name, company, email..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => dispatch(setFilterStatus(e.target.value))}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-sky-500"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingLead(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Lead</span>
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Lead Name</th>
                <th className="p-4">Company</th>
                <th className="p-4">Est. Value</th>
                <th className="p-4">Status</th>
                <th className="p-4">Source</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-white">
                    <div>{lead.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 font-normal">
                      <Mail className="w-3 h-3" /> {lead.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lead.company}</span>
                    </div>
                  </td>
                  <td className="p-4 font-black text-emerald-400">${lead.value.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      lead.status === 'Qualified' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30' :
                      lead.status === 'Negotiation' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                      lead.status === 'Proposal' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{lead.source}</td>
                  <td className="p-4 text-slate-300 font-medium">{lead.assignedTo}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openEdit(lead)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => dispatch(deleteLead(lead.id))} className="p-1.5 bg-rose-950/40 hover:bg-rose-900 text-rose-400 rounded-lg border border-rose-800/50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-base font-bold text-white">{editingLead ? 'Edit Lead Record' : 'Add New Enterprise Lead'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Contact Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Company Name</label>
                <input required type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Estimated Value ($)</label>
                  <input required type="number" value={formData.value} onChange={(e) => setFormData({...formData, value: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
