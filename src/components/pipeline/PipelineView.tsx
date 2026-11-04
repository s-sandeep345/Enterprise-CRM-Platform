import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateDealStage, deleteDeal } from '../../store/slices/pipelineSlice';
import { DealStage, Deal } from '../../types/crm';
import { DollarSign, Clock, User, Trash2 } from 'lucide-react';

const STAGES: DealStage[] = ['Discovery', 'Proposal Sent', 'In Negotiation', 'Contract Signed', 'Closed Won'];

export const PipelineView: React.FC = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state: RootState) => state.pipeline.deals);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: DealStage) => {
    const dealId = e.dataTransfer.getData('text/plain');
    if (dealId) {
      dispatch(updateDealStage({ id: dealId, stage }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Visual Kanban Deal Pipeline</h2>
          <p className="text-xs text-slate-500">Drag and drop cards between stages to update deal lifecycle status</p>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mb-3 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-black text-white">{stage}</h4>
                  <span className="text-[10px] font-extrabold text-sky-400">${(stageTotal / 1000).toFixed(0)}k total</span>
                </div>
                <span className="w-5 h-5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {stageDeals.length}
                </span>
              </div>

              {/* Deal Cards List */}
              <div className="space-y-3 flex-1">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', deal.id)}
                    className="p-4 bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-xl shadow-sm cursor-grab active:cursor-grabbing transition space-y-2 group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-slate-500">{deal.id}</span>
                      <button
                        onClick={() => dispatch(deleteDeal(deal.id))}
                        className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h5 className="text-xs font-bold text-white line-clamp-1">{deal.title}</h5>
                    <p className="text-[11px] text-slate-400 font-medium">{deal.company}</p>

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-emerald-400">${deal.amount.toLocaleString()}</span>
                      <span className="text-slate-500 text-[10px]">{deal.probability}% win prob</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        <span>{deal.assignedTo.split(' ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{deal.expectedClose.substring(5)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
