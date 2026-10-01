import React from 'react';
import { 
  X, 
  Cpu, 
  Zap, 
  ShieldAlert, 
  Lightbulb, 
  Sparkles, 
  HelpCircle, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { LabComponent, DetectedComponent } from '../types/lab';

interface ComponentDetailModalProps {
  component: LabComponent | null;
  detectedInfo?: DetectedComponent | null;
  onClose: () => void;
  onCheckCompatibilityWith?: (componentId: string) => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  detectedInfo,
  onClose,
  onCheckCompatibilityWith
}) => {
  if (!component && !detectedInfo) return null;

  const title = detectedInfo?.name || component?.name || 'Component Details';
  const category = detectedInfo?.category || component?.category || 'General Electronics';
  const confidence = detectedInfo?.confidence ?? 95;
  const confidenceLevel = detectedInfo?.confidence_level ?? 'HIGH';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                  {category}
                </span>
              </div>
              {detectedInfo && (
                <div className="flex items-center space-x-2 text-xs mt-1">
                  <span className="text-slate-400">Confidence:</span>
                  <span className={`font-semibold font-mono px-2 py-0.5 rounded ${
                    confidenceLevel === 'HIGH' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    confidenceLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {confidence}% ({confidenceLevel})
                  </span>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">

          {/* Uncertainty / Warning notice if LOW confidence */}
          {detectedInfo && (confidenceLevel === 'LOW' || confidenceLevel === 'UNKNOWN') && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-amber-300">Identification Verification Required</p>
                <p>{detectedInfo.uncertainty_reason || 'Component cannot be confidently identified from this photograph. Please upload a clearer photograph or inspect part number markings.'}</p>
              </div>
            </div>
          )}

          {/* Visual Evidence Section */}
          {detectedInfo?.evidence && (
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Info className="h-4 w-4 text-cyan-400" />
                <span>Identification Evidence (Why AI believes this is the component)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {detectedInfo.evidence.visible_markings && (
                  <div>
                    <span className="text-slate-400">Markings: </span>
                    <span className="text-slate-200 font-mono">{detectedInfo.evidence.visible_markings}</span>
                  </div>
                )}
                {detectedInfo.evidence.physical_type && (
                  <div>
                    <span className="text-slate-400">Physical Type: </span>
                    <span className="text-slate-200">{detectedInfo.evidence.physical_type}</span>
                  </div>
                )}
                {detectedInfo.evidence.pin_terminal_configuration && (
                  <div>
                    <span className="text-slate-400">Pin Layout: </span>
                    <span className="text-slate-200">{detectedInfo.evidence.pin_terminal_configuration}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Student Quick Explanation Cards */}
          {component?.student_summary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
                <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs mb-1">
                  <HelpCircle className="h-4 w-4" />
                  <span>WHAT IS IT?</span>
                </div>
                <p className="text-xs text-slate-300">{component.what_is_it}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs mb-1">
                  <Activity className="h-4 w-4" />
                  <span>WHAT DOES IT DO?</span>
                </div>
                <p className="text-xs text-slate-300">{component.what_it_does}</p>
              </div>
            </div>
          )}

          {/* Scientific & Working Principle */}
          {component?.working_principle && (
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>How Does It Work? (Scientific & Electronic Principle)</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {component.working_principle}
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <strong className="text-cyan-300">Underlying Physics: </strong>
                {component.scientific_principle}
              </div>
            </div>
          )}

          {/* Pins & Connections */}
          {component?.pins && component.pins.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>Pinout & Terminal Configuration</span>
              </h3>
              <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/80 text-slate-300">
                    <tr>
                      <th className="py-2 px-3 font-semibold">Pin</th>
                      <th className="py-2 px-3 font-semibold">Type</th>
                      <th className="py-2 px-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                    {component.pins.map((pin, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-mono font-bold text-cyan-300">{pin.name}</td>
                        <td className="py-2 px-3 text-slate-400">{pin.type}</td>
                        <td className="py-2 px-3 text-slate-300">{pin.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Electrical Specs */}
          {component && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Operating Voltage</span>
                <span className="font-semibold text-slate-200 font-mono">{component.voltage}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Current Demand</span>
                <span className="font-semibold text-slate-200 font-mono">{component.current}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Logic Level</span>
                <span className="font-semibold text-slate-200 font-mono">{component.logic_level}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Interfaces</span>
                <span className="font-semibold text-slate-200">{component.interfaces.join(', ') || 'GPIO'}</span>
              </div>
            </div>
          )}

          {/* What Can I Do With It? */}
          {component?.common_projects && component.common_projects.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-emerald-400" />
                <span>What Can I Do With This Component?</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {component.common_projects.map((proj, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DANGER / NEVER CONNECT TO */}
          {component?.never_connect_to && component.never_connect_to.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                <span>What Should I NEVER Connect It Directly To?</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-rose-200">
                {component.never_connect_to.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              {component.safety && (
                <div className="text-[11px] text-rose-300/80 pt-1 border-t border-rose-500/20">
                  {component.safety.join(' ')}
                </div>
              )}
            </div>
          )}

          {/* Fun Fact */}
          {component?.fun_fact && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start space-x-2">
              <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-amber-300">Did You Know? </strong>
                {component.fun_fact}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          {component && onCheckCompatibilityWith && (
            <button
              onClick={() => {
                onCheckCompatibilityWith(component.id);
                onClose();
              }}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-medium cursor-pointer"
            >
              Check Compatibility with Other Parts
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
