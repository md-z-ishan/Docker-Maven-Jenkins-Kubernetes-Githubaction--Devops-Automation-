// Feature: Navigation sidebar with DevOps tools and sections
import React from 'react';
import { View } from '../types';
import { 
  LayoutDashboard, 
  Workflow, 
  Activity, 
  Bot, 
  BookOpen, 
  TerminalSquare 
} from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { id: View.PIPELINE, label: 'CI/CD Pipeline', icon: Workflow },
    { id: View.MONITORING, label: 'Observability', icon: Activity },
    { id: View.AI_ASSISTANT, label: 'DevOps AI', icon: Bot },
    { id: View.DOCS, label: 'Documentation', icon: BookOpen },
  ];

  return (
    <div className="w-64 bg-devops-900 border-r border-devops-700 flex flex-col h-full">
      <div className="p-6 border-b border-devops-700 flex items-center space-x-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <TerminalSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">SimOps</h1>
          <p className="text-xs text-slate-400">DevOps Ecosystem</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-devops-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-devops-700">
        <div className="bg-devops-800 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">System Operational</span>
          </div>
          <p className="text-xs text-slate-500">v2.5.0-stable</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;