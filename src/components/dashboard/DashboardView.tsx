import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DollarSign, Users, TrendingUp, CheckCircle, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const REVENUE_DATA = [
  { month: 'May', revenue: 420000, target: 400000 },
  { month: 'Jun', revenue: 510000, target: 450000 },
  { month: 'Jul', revenue: 480000, target: 470000 },
  { month: 'Aug', revenue: 620000, target: 500000 },
  { month: 'Sep', revenue: 710000, target: 550000 },
  { month: 'Oct', revenue: 890000, target: 600000 },
  { month: 'Nov', revenue: 950000, target: 700000 },
];

const STAGE_DISTRIBUTION = [
  { name: 'Discovery', value: 130000, color: '#38bdf8' },
  { name: 'Proposal', value: 120000, color: '#818cf8' },
  { name: 'Negotiation', value: 285000, color: '#fbbf24' },
  { name: 'Closed Won', value: 270000, color: '#34d399' },
];

export const DashboardView: React.FC = () => {
  const leads = useSelector((state: RootState) => state.leads.leads);
  const deals = useSelector((state: RootState) => state.pipeline.deals);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const totalPipelineValue = deals.reduce((acc, d) => acc + d.amount, 0);
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
  const wonDeals = deals.filter((d) => d.stage === 'Closed Won').length;

  return (
    <div className="space-y-6">
      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pipeline Value</span>
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3">${(totalPipelineValue).toLocaleString()}</p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Leads</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3">{leads.length}</p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>5 qualified this week</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Win Rate Ratio</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3">{((wonDeals / (deals.length || 1)) * 100).toFixed(1)}%</p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mt-2">
            <span>Target: 35.0% threshold</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Actionable Tasks</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3">{pendingTasks}</p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 mt-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>2 urgent review items</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Growth Area Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue Growth & Target Projections</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time enterprise closed revenue performance</p>
            </div>
            <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-extrabold rounded-lg">
              FY 2026
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Stage Distribution Pie Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pipeline Stage Value Split</h3>
            <p className="text-xs text-slate-500 mt-0.5">Value concentration across deal stages</p>
          </div>
          <div className="h-52 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={STAGE_DISTRIBUTION} innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {STAGE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            {STAGE_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400 font-medium truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
