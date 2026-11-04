import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateTaskStatus, deleteTask } from '../../store/slices/tasksSlice';
import { TaskStatus } from '../../types/crm';
import { CheckSquare, Clock, AlertCircle, Trash2 } from 'lucide-react';

export const TasksView: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Enterprise Task & Deadline Queue</h2>
          <p className="text-xs text-slate-500">Track task priorities and execution deadlines across teams</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 relative">
            <div className="flex justify-between items-start">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                task.priority === 'Urgent' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                task.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                'bg-slate-800 text-slate-400'
              }`}>
                {task.priority} Priority
              </span>

              <div className="flex items-center gap-2">
                <select
                  value={task.status}
                  onChange={(e) => dispatch(updateTaskStatus({ id: task.id, status: e.target.value as TaskStatus }))}
                  className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => dispatch(deleteTask(task.id))} className="text-slate-600 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h4 className="text-sm font-bold text-white">{task.title}</h4>
            <p className="text-xs text-slate-400">{task.description}</p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-semibold text-slate-400">Target: {task.relatedTo}</span>
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
