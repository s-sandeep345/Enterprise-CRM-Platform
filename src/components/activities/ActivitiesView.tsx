import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Phone, Video, Mail, MessageSquare } from 'lucide-react';

export const ActivitiesView: React.FC = () => {
  const activities = useSelector((state: RootState) => state.activities.activities);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Audit Log & Customer Interaction Feed</h3>
        <p className="text-xs text-slate-500 mt-0.5">Automated logging of emails, meetings, and phone calls</p>
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 space-y-6">
        {activities.map((act) => (
          <div key={act.id} className="relative pl-6">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-sky-400">
              {act.type === 'Call' && <Phone className="w-3 h-3" />}
              {act.type === 'Meeting' && <Video className="w-3 h-3" />}
              {act.type === 'Email' && <Mail className="w-3 h-3" />}
              {act.type === 'Follow-up' && <MessageSquare className="w-3 h-3" />}
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-white">{act.title}</span>
                <span className="text-[10px] text-slate-500 font-mono">{act.timestamp}</span>
              </div>
              <p className="text-xs text-slate-400">{act.details}</p>
              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                <span>Account: <strong className="text-slate-300">{act.relatedEntity}</strong></span>
                <span>By: <strong className="text-slate-300">{act.performedBy}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
