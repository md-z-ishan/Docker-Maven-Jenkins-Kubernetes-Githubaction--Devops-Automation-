// Feature: New UI enhancements for better user experience
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import PipelineVisualizer from './components/PipelineVisualizer';
import { MonitoringCharts } from './components/MonitoringCharts';
import TerminalWindow from './components/TerminalWindow';
import { createChatSession, sendMessageToChat, analyzeLogsWithAI } from './services/geminiService';
import {
  View,
  PipelineStage,
  StageStatus,
  PipelineStatus,
  MetricPoint,
  ChatMessage
} from './types';
import {
  Play,
  RotateCw,
  AlertTriangle,
  CheckCircle,
  Send,
  Sparkles
} from 'lucide-react';
import { Chat } from '@google/genai';

const INITIAL_STAGES: PipelineStage[] = [
  { id: '1', name: 'Source Code', tool: 'Git', status: StageStatus.PENDING, logs: [] },
  { id: '2', name: 'Build & Test', tool: 'Maven', status: StageStatus.PENDING, logs: [] },
  { id: '3', name: 'Containerize', tool: 'Docker', status: StageStatus.PENDING, logs: [] },
  { id: '4', name: 'Deploy', tool: 'Kubernetes', status: StageStatus.PENDING, logs: [] },
];

const INITIAL_METRICS = Array.from({ length: 20 }, (_, i) => ({
  time: new Date(Date.now() - (20 - i) * 1000).toISOString(),
  cpu: 20 + Math.random() * 10,
  memory: 40 + Math.random() * 5,
  requests: 100 + Math.random() * 50,
  errors: 0
}));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>(PipelineStatus.IDLE);
  const [stages, setStages] = useState<PipelineStage[]>(INITIAL_STAGES);
  const [allLogs, setAllLogs] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<MetricPoint[]>(INITIAL_METRICS);

  // Chat State
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize Chat
  useEffect(() => {
    const session = createChatSession();
    setChatSession(session);
    setMessages([
      {
        id: 'init',
        role: 'model',
        text: "Hello! I'm your DevOps Assistant. I can explain the current pipeline status, analyze logs, or help you understand tools like Kubernetes and Maven. How can I help?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Metrics Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const last = prev[prev.length - 1];
        const time = new Date().toISOString();

        let newCpu = last.cpu + (Math.random() - 0.5) * 10;
        if (pipelineStatus === PipelineStatus.RUNNING) newCpu += 5;
        newCpu = Math.max(10, Math.min(95, newCpu)); // Clamp

        let newErrors = Math.random() > 0.95 ? Math.floor(Math.random() * 5) : 0;
        if (pipelineStatus === PipelineStatus.FAILED) newErrors += 20;

        const newPoint: MetricPoint = {
          time,
          cpu: newCpu,
          memory: Math.max(20, Math.min(90, last.memory + (Math.random() - 0.5) * 5)),
          requests: Math.max(50, last.requests + (Math.random() - 0.5) * 50),
          errors: newErrors
        };
        return [...prev.slice(1), newPoint];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pipelineStatus]);

  // Log Helper
  const addLog = useCallback((message: string) => {
    setAllLogs(prev => [...prev, message]);
  }, []);

  const updateStage = (id: string, updates: Partial<PipelineStage>) => {
    setStages(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  // Pipeline Simulation Logic
  const runPipeline = async () => {
    if (pipelineStatus === PipelineStatus.RUNNING) return;

    setPipelineStatus(PipelineStatus.RUNNING);
    setStages(INITIAL_STAGES.map(s => ({ ...s, status: StageStatus.PENDING, logs: [] })));
    setAllLogs([]);
    addLog("Initializing Pipeline Sequence...");

    // Stage 1: Git
    updateStage('1', { status: StageStatus.RUNNING });
    addLog("git fetch origin main");
    await new Promise(r => setTimeout(r, 1500));
    addLog("git checkout -b release/v2.5.1");
    updateStage('1', { status: StageStatus.COMPLETED, logs: ['Fetched origin', 'Checked out branch'] });

    // Stage 2: Maven Build
    updateStage('2', { status: StageStatus.RUNNING });
    addLog("mvn clean package -DskipTests=false");
    await new Promise(r => setTimeout(r, 1500));
    addLog("[INFO] Scanning for projects...");
    addLog("[INFO] Building SimOps Core 1.0-SNAPSHOT");
    addLog("[INFO] --- maven-compiler-plugin:3.8.1:compile ---");
    await new Promise(r => setTimeout(r, 1000));
    addLog("[INFO] --- maven-surefire-plugin:2.22.2:test ---");
    addLog("[INFO] Running com.simops.AppTest");

    // Random Failure Simulation (20% chance)
    if (Math.random() > 0.8) {
      addLog("[ERROR] Failures: ");
      addLog("[ERROR]   AppTest.testApp:42 expected: <true> but was: <false>");
      addLog("[INFO] BUILD FAILURE");
      updateStage('2', { status: StageStatus.FAILED, logs: ['[INFO] BUILD FAILURE', '[ERROR] Tests failed'] });
      setPipelineStatus(PipelineStatus.FAILED);
      return;
    }
    addLog("[INFO] Tests run: 42, Failures: 0, Errors: 0, Skipped: 0");
    addLog("[INFO] BUILD SUCCESS");
    updateStage('2', { status: StageStatus.COMPLETED, logs: ['[INFO] BUILD SUCCESS', 'Tests Passed (42/42)'] });

    // Stage 3: Docker
    updateStage('3', { status: StageStatus.RUNNING });
    addLog("docker build -t app:latest .");
    await new Promise(r => setTimeout(r, 2000));
    addLog("Sending build context to Docker daemon...");
    addLog("Step 1/5 : FROM eclipse-temurin:17-jre-alpine");
    addLog("COPY target/simops.jar app.jar");
    updateStage('3', { status: StageStatus.COMPLETED, logs: ['Image built', 'Pushed to registry'] });

    // Stage 4: Kubernetes
    updateStage('4', { status: StageStatus.RUNNING });
    addLog("kubectl apply -f deployment.yaml");
    await new Promise(r => setTimeout(r, 2000));
    addLog("deployment.apps/simops-app configured");
    updateStage('4', { status: StageStatus.COMPLETED, logs: ['Deployment applied', 'Pods scaling up'] });

    setPipelineStatus(PipelineStatus.SUCCESS);
    addLog("Pipeline Completed Successfully.");
  };

  // Chat Handler
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const responseText = await sendMessageToChat(chatSession, inputMessage);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  const handleAnalyzeLogs = async () => {
    if (!chatSession) return;
    setCurrentView(View.AI_ASSISTANT);
    setIsTyping(true);

    const analysis = await analyzeLogsWithAI(allLogs);

    const modelMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'model',
      text: `**Log Analysis:**\n\n${analysis}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  }

  // --- Views ---

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-devops-800 p-4 rounded-xl border border-devops-700">
          <p className="text-slate-400 text-sm">Pipeline Status</p>
          <div className="flex items-center space-x-2 mt-2">
            {pipelineStatus === PipelineStatus.RUNNING && <RotateCw className="animate-spin text-blue-500" />}
            {pipelineStatus === PipelineStatus.SUCCESS && <CheckCircle className="text-green-500" />}
            {pipelineStatus === PipelineStatus.FAILED && <AlertTriangle className="text-red-500" />}
            {pipelineStatus === PipelineStatus.IDLE && <Play className="text-slate-500" />}
            <span className="text-xl font-bold font-mono text-white">{pipelineStatus}</span>
          </div>
        </div>
        <div className="bg-devops-800 p-4 rounded-xl border border-devops-700">
          <p className="text-slate-400 text-sm">Build Success Rate</p>
          <p className="text-xl font-bold font-mono text-white mt-2">98.4%</p>
        </div>
        <div className="bg-devops-800 p-4 rounded-xl border border-devops-700">
          <p className="text-slate-400 text-sm">Mean Time to Recovery</p>
          <p className="text-xl font-bold font-mono text-white mt-2">12m 30s</p>
        </div>
        <div className="bg-devops-800 p-4 rounded-xl border border-devops-700">
          <p className="text-slate-400 text-sm">Active Pods</p>
          <p className="text-xl font-bold font-mono text-white mt-2">4/4</p>
        </div>
      </div>

      {/* Main Control */}
      <div className="bg-devops-800 border border-devops-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Active Pipeline</h2>
          <div className="flex space-x-3">
            {pipelineStatus === PipelineStatus.FAILED && (
              <button
                onClick={handleAnalyzeLogs}
                className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Error with AI
              </button>
            )}
            <button
              onClick={runPipeline}
              disabled={pipelineStatus === PipelineStatus.RUNNING}
              className={`flex items-center px-6 py-2 rounded-lg font-bold transition-all ${pipelineStatus === PipelineStatus.RUNNING
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50'
                }`}
            >
              {pipelineStatus === PipelineStatus.RUNNING ? (
                <><RotateCw className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Trigger Deployment</>
              )}
            </button>
          </div>
        </div>
        <PipelineVisualizer stages={stages} />
      </div>

      <MonitoringCharts data={metrics} />
    </div>
  );

  const renderChat = () => (
    <div className="h-full flex flex-col bg-devops-800 border border-devops-700 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-devops-700 bg-devops-900/50">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
          DevOps AI Assistant
        </h2>
        <p className="text-sm text-slate-400">Powered by Gemini 2.5 Flash</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-devops-700 text-slate-200 rounded-bl-none border border-devops-600'
              }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-devops-700 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-devops-900/50 border-t border-devops-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about pipelines, Docker, or metrics..."
            className="flex-1 bg-devops-900 border border-devops-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isTyping || !inputMessage.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDocumentation = () => (
    <div className="prose prose-invert max-w-none p-6 bg-devops-800 rounded-xl border border-devops-700">
      <h1>DevOps Ecosystem Simulation</h1>
      <p>
        Modern software systems demand rapid development, continuous delivery, and high reliability.
        This project simulates a complete end-to-end DevOps ecosystem using Git, Maven, Docker, and Kubernetes.
      </p>

      <h3>Objectives</h3>
      <ul>
        <li>Design and implement an automated CI/CD pipeline.</li>
        <li>Automate builds and tests using Apache Maven.</li>
        <li>Containerize applications using Docker.</li>
        <li>Integrate monitoring tools like Prometheus and Grafana.</li>
        <li>Use Git for version control and branching.</li>
      </ul>

      <h3>Workflow Simulation</h3>
      <p>
        Click "Trigger Deployment" on the dashboard to start the simulation.
        The system will emulate a git commit, followed by a Maven build process (clean package), Docker image creation, and finally a Kubernetes deployment update.
        Failures are randomized to simulate real-world scenarios.
      </p>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-devops-900 text-slate-200">
      <Sidebar currentView={currentView} setView={setCurrentView} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-16 border-b border-devops-700 bg-devops-900/80 backdrop-blur flex items-center px-6 justify-between">
          <h2 className="font-semibold text-lg text-white">
            {currentView === View.DASHBOARD && 'Operational Dashboard'}
            {currentView === View.PIPELINE && 'Pipeline Visualization'}
            {currentView === View.MONITORING && 'System Observability'}
            {currentView === View.AI_ASSISTANT && 'AI Operations Assistant'}
            {currentView === View.DOCS && 'Project Documentation'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-slate-400">
              Environment: <span className="text-green-400 font-mono">PRODUCTION</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main View */}
          <div className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${currentView !== View.DASHBOARD && currentView !== View.PIPELINE ? 'w-full' : ''}`}>
            {currentView === View.DASHBOARD && renderDashboard()}
            {currentView === View.PIPELINE && renderDashboard()}
            {currentView === View.MONITORING && <MonitoringCharts data={metrics} />}
            {currentView === View.AI_ASSISTANT && renderChat()}
            {currentView === View.DOCS && renderDocumentation()}
          </div>

          {/* Right Panel: Logs (Visible in Dashboard/Pipeline views) */}
          {(currentView === View.DASHBOARD || currentView === View.PIPELINE) && (
            <div className="w-96 border-l border-devops-700 bg-black p-4 hidden xl:block">
              <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Live Logs</h3>
              <div className="h-[calc(100%-2rem)]">
                <TerminalWindow logs={allLogs} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;