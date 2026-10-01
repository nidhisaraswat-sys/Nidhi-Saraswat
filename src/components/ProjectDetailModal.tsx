import React, { useState } from 'react';
import { 
  X, 
  Lightbulb, 
  Cpu, 
  Layers, 
  Code2, 
  Wrench, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShoppingCart,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { LabProject, FeasibilityResult } from '../types/lab';

interface ProjectDetailModalProps {
  feasibility: FeasibilityResult | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  feasibility,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'circuit' | 'code' | 'troubleshoot' | 'viva'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [expandedViva, setExpandedViva] = useState<number | null>(null);

  if (!feasibility) return null;
  const project = feasibility.project;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.code_template);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-slate-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{project.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                  {project.category}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  project.difficulty === 'Beginner' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                  project.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {project.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target: Class {project.class_levels.join(', ')} • Programming Board: {project.programming_board}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="px-6 border-b border-slate-800 flex space-x-4 text-xs font-semibold overflow-x-auto shrink-0 bg-slate-950/40">
          {[
            { id: 'overview', label: '1. Overview & Components' },
            { id: 'circuit', label: '2. Circuit & Block Diagram' },
            { id: 'code', label: '3. Complete Code & Libs' },
            { id: 'troubleshoot', label: '4. Testing & Safety' },
            { id: 'viva', label: '5. Viva Questions (5-10)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-400 text-emerald-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">

          {/* TAB 1: OVERVIEW & COMPONENTS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Objective & Problem */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                  <h3 className="font-bold text-cyan-300 uppercase tracking-wider text-xs flex items-center space-x-1.5">
                    <BookOpen className="h-4 w-4" />
                    <span>Project Objective</span>
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{project.objective}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                  <h3 className="font-bold text-amber-300 uppercase tracking-wider text-xs flex items-center space-x-1.5">
                    <AlertCircle className="h-4 w-4" />
                    <span>Problem Statement</span>
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{project.problem_statement}</p>
                </div>
              </div>

              {/* Scientific Principle */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <h3 className="font-bold text-emerald-300 uppercase tracking-wider text-xs">
                  Scientific & Engineering Principle
                </h3>
                <p className="text-slate-200 leading-relaxed">{project.scientific_principle}</p>
              </div>

              {/* Component Inventory Check: Available vs Missing (Shopping List) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4 text-cyan-400" />
                    <span>Laboratory Components Requirement & Availability</span>
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    feasibility.status === 'CAN_BUILD_NOW' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {feasibility.status === 'CAN_BUILD_NOW' ? '🟢 100% Ready To Build' : '🟡 Missing Some Parts'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Available */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <h4 className="font-semibold text-emerald-400 text-xs flex items-center space-x-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Available in Lab Stock ({feasibility.available_components.length})</span>
                    </h4>
                    {feasibility.available_components.length === 0 ? (
                      <p className="text-slate-400 text-xs italic">No components detected yet.</p>
                    ) : (
                      <ul className="space-y-1.5">
                        {feasibility.available_components.map((comp, idx) => (
                          <li key={idx} className="flex items-center justify-between p-2 rounded bg-slate-900/60 text-xs">
                            <span className="text-slate-200">{comp.name}</span>
                            <span className="font-mono text-emerald-300 font-semibold">
                              ✓ {comp.required} required (have {comp.available})
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Missing (Shopping list) */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <h4 className="font-semibold text-rose-400 text-xs flex items-center space-x-1.5">
                      <AlertCircle className="h-4 w-4" />
                      <span>Additional Components Needed ({feasibility.missing_components.length})</span>
                    </h4>
                    {feasibility.missing_components.length === 0 ? (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                        All required components are currently available in the laboratory! You can start building immediately.
                      </div>
                    ) : (
                      <ul className="space-y-1.5">
                        {feasibility.missing_components.map((comp, idx) => (
                          <li key={idx} className="flex items-center justify-between p-2 rounded bg-rose-950/20 border border-rose-500/20 text-xs">
                            <span className="text-slate-200">{comp.name}</span>
                            <span className="font-mono text-rose-300 font-semibold">
                              ✗ Need {comp.needed} more
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Working */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
                  Step-by-Step Working Explanation
                </h3>
                <p className="text-slate-300 leading-relaxed">{project.working_explanation}</p>
              </div>

              {/* Real life & Future Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 space-y-1.5">
                  <h4 className="font-bold text-cyan-300 text-xs uppercase tracking-wider">Real-Life Applications</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                    {project.real_life_applications.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 space-y-1.5">
                  <h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider">Future Improvements & Extensions</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                    {project.future_improvements.map((ext, i) => (
                      <li key={i}>{ext}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CIRCUIT & BLOCK DIAGRAM */}
          {activeTab === 'circuit' && (
            <div className="space-y-6">
              {/* Block Diagram */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <h3 className="font-bold text-cyan-300 text-xs uppercase tracking-wider flex items-center space-x-2">
                  <Layers className="h-4 w-4" />
                  <span>System Logical Block Diagram</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                    <span className="font-bold text-cyan-400 block mb-1">INPUTS / SENSORS</span>
                    <p className="text-slate-300 text-[11px]">{project.block_diagram.inputs.join(', ')}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30">
                    <span className="font-bold text-blue-400 block mb-1">PROCESSING</span>
                    <p className="text-slate-300 text-[11px]">{project.block_diagram.processing.join(', ')}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                    <span className="font-bold text-emerald-400 block mb-1">ACTUATORS / OUTPUTS</span>
                    <p className="text-slate-300 text-[11px]">{project.block_diagram.outputs.join(', ')}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30">
                    <span className="font-bold text-amber-400 block mb-1">POWER SYSTEM</span>
                    <p className="text-slate-300 text-[11px]">{project.block_diagram.power.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Pin Connection Table */}
              <div className="space-y-2">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                  Detailed Circuit Connections Table
                </h3>
                <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-300">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Component</th>
                        <th className="py-2.5 px-3 font-semibold">Component Pin</th>
                        <th className="py-2.5 px-3 font-semibold">Connects To</th>
                        <th className="py-2.5 px-3 font-semibold">Engineering Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                      {project.circuit_connections.map((conn, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="py-2 px-3 font-semibold text-slate-200">{conn.component}</td>
                          <td className="py-2 px-3 font-mono text-cyan-300 font-bold">{conn.pin}</td>
                          <td className="py-2 px-3 font-mono text-emerald-300">{conn.connection}</td>
                          <td className="py-2 px-3 text-slate-400 text-[11px]">{conn.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Power & Ground Warning */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
                <h4 className="font-bold text-amber-300 text-xs flex items-center space-x-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Golden Circuit Rule: Common Ground</span>
                </h4>
                <p className="text-xs leading-relaxed">
                  When using external power supplies or battery packs (e.g. for L298N motors, pumps, or servos), you <strong>MUST connect the negative (-) battery lead to the Arduino / ESP32 GND pin</strong>. Without common ground, logic signals have no electrical reference and will fail!
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: COMPLETE CODE */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                    <Code2 className="h-4 w-4 text-emerald-400" />
                    <span>Complete {project.code_language} Source Code</span>
                  </h3>
                  <p className="text-slate-400 text-xs">Ready to copy and paste into Arduino IDE or MicroPython Editor</p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow"
                >
                  {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code Box */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Target Board: {project.programming_board}</span>
                  <span>{project.code_language}</span>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-96">
                  <code>{project.code_template}</code>
                </pre>
              </div>

              {/* Required Libraries */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                <h4 className="font-bold text-cyan-300 text-xs">Required Libraries & Installation</h4>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {project.required_libraries.map((lib, i) => (
                    <li key={i}>{lib}</li>
                  ))}
                </ul>
              </div>

              {/* Expected Output */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                <h4 className="font-bold text-emerald-300 text-xs">Expected Observable Behavior</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{project.expected_output}</p>
              </div>
            </div>
          )}

          {/* TAB 4: TROUBLESHOOTING & SAFETY */}
          {activeTab === 'troubleshoot' && (
            <div className="space-y-6">
              {/* Troubleshooting table */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                  <Wrench className="h-4 w-4 text-amber-400" />
                  <span>Common Troubleshooting & Debugging Guide</span>
                </h3>
                <div className="space-y-3">
                  {project.troubleshooting.map((tb, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1 text-xs">
                      <div className="font-semibold text-rose-300 flex items-center space-x-1.5">
                        <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        <span>Issue: {tb.issue}</span>
                      </div>
                      <p className="text-slate-400 pl-5"><strong className="text-slate-300">Likely Cause: </strong>{tb.cause}</p>
                      <p className="text-emerald-300 pl-5"><strong className="text-emerald-400">Solution: </strong>{tb.solution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Precautions */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <h3 className="font-bold text-rose-400 text-xs uppercase tracking-wider flex items-center space-x-2">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Safety Precautions & Laboratory Hygiene</span>
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-rose-200">
                  {project.safety_precautions.map((safe, idx) => (
                    <li key={idx}>{safe}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 5: VIVA QUESTIONS */}
          {activeTab === 'viva' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                    <HelpCircle className="h-4 w-4 text-cyan-400" />
                    <span>Oral Examination & Viva Questions with Model Answers</span>
                  </h3>
                  <p className="text-slate-400 text-xs">Essential for school practical exams and science fair judge evaluations</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {project.viva_questions.map((viva, idx) => {
                  const isExpanded = expandedViva === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-slate-800 rounded-xl overflow-hidden bg-slate-800/40"
                    >
                      <button
                        onClick={() => setExpandedViva(isExpanded ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between hover:bg-slate-800/70 transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-slate-200 text-xs flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[11px]">
                            Q{idx + 1}
                          </span>
                          <span>{viva.question}</span>
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-emerald-300 leading-relaxed pl-10">
                          <strong className="text-emerald-400 block mb-0.5">Model Answer:</strong>
                          {viva.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400">
            AI Lab Assistant • Science Curriculum Ready
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
          >
            Close Project
          </button>
        </div>

      </div>
    </div>
  );
};
