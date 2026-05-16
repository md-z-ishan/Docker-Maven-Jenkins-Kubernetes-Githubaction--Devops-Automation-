// Feature: Simulated terminal window for DevOps commands
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface TerminalWindowProps {
  logs: string[];
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black rounded-lg border border-devops-700 font-mono text-sm h-full flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 border-b border-devops-700 bg-devops-800 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 text-xs">console_output.log</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-1 text-slate-300"
      >
        {logs.length === 0 && <span className="text-slate-600 opacity-50">No active process...</span>}
        {logs.map((log, index) => (
          <div key={index} className="break-all whitespace-pre-wrap">
            <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.includes('ERROR') || log.includes('Failed') ? 'text-red-400' : log.includes('SUCCESS') ? 'text-green-400' : 'text-slate-300'}>
              {log}
            </span>
          </div>
        ))}
        <div className="animate-pulse text-blue-500">_</div>
      </div>
    </div>
  );
};

export default TerminalWindow;