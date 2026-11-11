import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedCustomer } from '../../store/slices/customersSlice';
import { Mail, Phone, MapPin, Calendar, Tag } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const dispatch = useDispatch();
  const { customers, selectedCustomerId } = useSelector((state: RootState) => state.customers);
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Customers Directory List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Key Accounts Directory</h3>
        <div className="space-y-2">
          {customers.map((cust) => {
            const isSelected = cust.id === selectedCustomer.id;
            return (
              <div
                key={cust.id}
                onClick={() => dispatch(setSelectedCustomer(cust.id))}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-500/40 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-white">{cust.company}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                    cust.status === 'VIP' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cust.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{cust.name} • {cust.industry}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Customer Profile Card */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/20">
              {selectedCustomer.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-black text-white">{selectedCustomer.company}</h2>
              <p className="text-xs text-slate-400">Primary Contact: <span className="text-sky-400 font-semibold">{selectedCustomer.name}</span></p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Lifetime Value</span>
            <span className="text-2xl font-black text-emerald-400">${selectedCustomer.totalSpent.toLocaleString()}</span>
          </div>
        </div>

        {/* Contact Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
            <Mail className="w-4 h-4 text-sky-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-bold">Email</p>
              <p className="text-slate-200 font-medium">{selectedCustomer.email}</p>
            </div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
            <Phone className="w-4 h-4 text-sky-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-bold">Phone</p>
              <p className="text-slate-200 font-medium">{selectedCustomer.phone}</p>
            </div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
            <MapPin className="w-4 h-4 text-sky-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-bold">HQ Location</p>
              <p className="text-slate-200 font-medium">{selectedCustomer.address}</p>
            </div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
            <Calendar className="w-4 h-4 text-sky-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-bold">Client Since</p>
              <p className="text-slate-200 font-medium">{selectedCustomer.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Account Tags */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account Categorization Tags</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCustomer.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-800 text-sky-400 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700">
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
