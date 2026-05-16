// Feature: Interactive CI/CD pipeline visualizer with stage status indicators
import React from 'react';
import { PipelineStage, StageStatus } from '../types';
import { GitCommit, Package, Container, UploadCloud, CheckCircle2, XCircle, Loader2, Clock, Hammer } from 'lucide-react';

interface PipelineVisualizerProps {
  stages: PipelineStage[];
}

const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ stages }) => {
  const getIcon = (tool: string) => {
    switch (tool) {
      case 'Git': return GitCommit;
      case 'Maven': return Hammer; // Using Hammer or Package for Maven
      case 'Docker': return Container;
      case 'Kubernetes': return UploadCloud;
      default: return Package;
    }
  };

  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case StageStatus.COMPLETED: return 'bg-green-500/20 border-green-500 text-green-400';
      case StageStatus.FAILED: return 'bg-red-500/20 border-red-500 text-red-400';
      case StageStatus.RUNNING: return 'bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse';
      case StageStatus.PENDING: return 'bg-slate-800 border-slate-700 text-slate-500';
      case StageStatus.SKIPPED: return 'bg-slate-800 border-dashed border-slate-600 text-slate-600';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center min-w-max px-4">
        {stages.map((stage, index) => {
          const Icon = getIcon(stage.tool);
          const isLast = index === stages.length - 1;

          return (
            <React.Fragment key={stage.id}>
              {/* Node */}
              <div className="relative group">
                <div 
                  className={`w-64 p-4 rounded-xl border-2 transition-all duration-300 ${getStatusColor(stage.status)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-devops-900/50">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end">
                       {stage.status === StageStatus.COMPLETED && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                       {stage.status === StageStatus.FAILED && <XCircle className="w-5 h-5 text-red-500" />}
                       {stage.status === StageStatus.RUNNING && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                       {stage.status === StageStatus.PENDING && <Clock className="w-5 h-5 text-slate-600" />}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{stage.name}</h3>
                  <div className="flex items-center space-x-2 text-xs opacity-80 mb-2">
                    <span className="font-mono bg-black/30 px-1 rounded">{stage.tool}</span>
                  </div>
                  
                  <div className="h-16 overflow-hidden bg-black/40 rounded p-2 text-xs font-mono text-slate-300">
                    {stage.logs.slice(-3).map((log, i) => (
                      <div key={i} className="truncate">{">"} {log}</div>

                    ))}
                    {stage.logs.length === 0 && <span className="text-slate-600 italic">Waiting...</span>}
                  </div>
                </div>

                {/* Hover Details Card (Tool tip style) */}
                <div className="absolute top-full left-0 w-full mt-2 hidden group-hover:block z-10">
                   <div className="bg-devops-800 border border-slate-600 rounded p-2 shadow-xl text-xs text-slate-300">
                      Duration: {stage.duration ? `${stage.duration}ms` : 'N/A'}
                   </div>
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="flex items-center justify-center w-12">
                   <div className={`h-1 w-full ${stages[index+1].status !== StageStatus.PENDING ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineVisualizer;