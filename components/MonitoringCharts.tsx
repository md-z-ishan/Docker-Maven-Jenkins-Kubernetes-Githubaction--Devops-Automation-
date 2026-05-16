// Feature: Enhanced monitoring charts with real-time data visualization
// Added support for CPU and memory metrics
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { MetricPoint } from '../types';

interface MonitoringChartsProps {
  data: MetricPoint[];
}

export const MonitoringCharts: React.FC<MonitoringChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* CPU & Memory - Prometheus Style */}
      <div className="bg-devops-800 border border-devops-700 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="text-lg font-bold text-white flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                    Prometheus / Node Metrics
                </h3>
                <p className="text-xs text-slate-400">Cluster Resource Usage</p>
            </div>
            <div className="bg-slate-900 px-3 py-1 rounded text-xs font-mono text-green-400">Live</div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" name="CPU Usage %" />
              <Area type="monotone" dataKey="memory" stroke="#10b981" fillOpacity={1} fill="url(#colorMem)" name="Memory Usage %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic - Grafana Style */}
      <div className="bg-devops-800 border border-devops-700 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="text-lg font-bold text-white flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                    Grafana / Ingress Traffic
                </h3>
                <p className="text-xs text-slate-400">Requests vs Errors (Rate)</p>
            </div>
            <div className="bg-slate-900 px-3 py-1 rounded text-xs font-mono text-green-400">Live</div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
              />
              <Legend />
              <Bar dataKey="requests" fill="#8b5cf6" name="HTTP 200 OK" radius={[4, 4, 0, 0]} />
              <Bar dataKey="errors" fill="#ef4444" name="HTTP 5xx" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};