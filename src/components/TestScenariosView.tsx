import React from 'react';
import { 
  Beaker, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { TEST_SCENARIOS, TestScenario } from '../data/testScenarios';
import { DetectedComponent } from '../types/lab';

interface TestScenariosViewProps {
  onRunTest: (scenario: TestScenario) => void;
}

export const TestScenariosView: React.FC<TestScenariosViewProps> = ({
  onRunTest
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
          <Beaker className="h-3.5 w-3.5" />
          <span>Quality Assurance & Scenario Test Suite</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">12 Laboratory Verification Scenarios</h1>
        <p className="text-xs text-slate-300">
          Click "Run Test" on any scenario to immediately populate detection, evaluate feasibility, trigger compatibility engines, or inspect circuit errors.
        </p>
      </div>

      {/* Grid of 12 Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEST_SCENARIOS.map((scenario) => {
          return (
            <div
              key={scenario.id}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950/40 border border-rose-500/30">
                    {scenario.id.toUpperCase()}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {scenario.category}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm leading-snug">{scenario.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{scenario.description}</p>
                
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-cyan-300/90 italic">
                  🔍 {scenario.promptHint}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {scenario.detectedComponents.length > 0 ? `${scenario.detectedComponents.length} Components` : 'Diagnostic Test'}
                </span>
                <button
                  onClick={() => onRunTest(scenario)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer shadow transition-colors"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Run Scenario</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
