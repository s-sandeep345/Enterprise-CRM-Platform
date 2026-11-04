import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { LeadsView } from './components/leads/LeadsView';
import { PipelineView } from './components/pipeline/PipelineView';
import { CustomersView } from './components/customers/CustomersView';
import { TasksView } from './components/tasks/TasksView';
import { ActivitiesView } from './components/activities/ActivitiesView';
import { ViewTab } from './types/crm';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
          title={activeTab}
          onQuickAdd={() => setActiveTab('leads')}
        />

        <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'leads' && <LeadsView />}
          {activeTab === 'pipeline' && <PipelineView />}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'tasks' && <TasksView />}
          {activeTab === 'activities' && <ActivitiesView />}
        </main>
      </div>
    </div>
  );
}
