import React, { useState, useRef } from 'react';
import { 
  Wrench, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  ShieldAlert, 
  Sparkles, 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { CircuitCheckResult } from '../types/lab';
import { TEST_SCENARIOS } from '../data/testScenarios';

export const CircuitCheckerView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CircuitCheckResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      analyzeCircuit(base64);
    };
    reader.readAsDataURL(file);
  };

  const loadSampleErroneousCircuit = () => {
    const test12 = TEST_SCENARIOS.find(t => t.id === 'test-12');
    if (test12?.circuitCheckResult) {
      setResult(test12.circuitCheckResult);
      setUserNotes('Test 12: Breadboard with Red LED wired directly to 5V without series resistor, and reverse diode.');
      setSelectedImage('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%231e293b"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2338bdf8" font-family="sans-serif" font-size="14">Sample Circuit: Missing Resistor on LED</text></svg>');
    }
  };

  const analyzeCircuit = async (base64: string) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-circuit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType: 'image/jpeg',
          userCircuitNotes: userNotes
        })
      });

      if (!response.ok) throw new Error(`Server returned HTTP ${response.status}`);
      const data = await response.json();
      setResult(data);
      setIsAnalyzing(false);
    } catch (err: any) {
      console.error('Circuit analysis error:', err);
      setIsAnalyzing(false);
      setErrorMsg('Failed to analyze circuit via AI vision. You can click "Load Test 12 Sample" to test the diagnostic output format!');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Wrench className="h-3.5 w-3.5" />
          <span>Automated Breadboard & Wiring Inspector</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Check My Circuit (AI Safety & Wiring Diagnostics)</h1>
        <p className="text-xs text-slate-300">
          Upload or take a photo of your breadboard circuit or robot wiring. The AI inspects component polarity, missing resistors, common ground, and short circuit hazards.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer shadow-lg shadow-purple-500/20"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Circuit Photo</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />

          <button
            onClick={loadSampleErroneousCircuit}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>Load Sample Circuit (Test 12: Missing Resistor)</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isAnalyzing && (
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-purple-500/40 text-center space-y-3 max-w-lg mx-auto">
          <RefreshCw className="h-8 w-8 text-purple-400 animate-spin mx-auto" />
          <h3 className="font-bold text-white text-base">Analyzing Circuit Wiring & Polarity...</h3>
          <p className="text-xs text-slate-400">
            Checking breadboard tracks, IC orientations, resistor values, diode cathode stripes, and common ground return paths.
          </p>
        </div>
      )}

      {/* Error state */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Diagnostic Results */}
      {result && !isAnalyzing && (
        <div className="space-y-6">
          
          {/* Summary Banner */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">AI Diagnostic Summary</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                Confidence: {result.confidence}
              </span>
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">{result.circuit_summary}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {result.detected_components.map((c, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Correct Connections */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2">
              <h3 className="font-bold text-emerald-400 text-xs uppercase tracking-wider flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Correct Connections Verified ({result.correct_connections.length})</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {result.correct_connections.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 p-2 rounded bg-slate-950/60">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Errors */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-2">
              <h3 className="font-bold text-rose-400 text-xs uppercase tracking-wider flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Detected Errors & Miswirings ({result.possible_errors.length})</span>
              </h3>
              {result.possible_errors.length === 0 ? (
                <p className="text-xs text-emerald-300 p-2">No wiring errors detected.</p>
              ) : (
                <ul className="space-y-1.5 text-xs text-rose-200">
                  {result.possible_errors.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 p-2 rounded bg-rose-950/20 border border-rose-500/20">
                      <span className="text-rose-400 font-bold">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Safety Hazards */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
              <h3 className="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4" />
                <span>Possible Safety & Thermal Issues ({result.possible_safety_issues.length})</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-amber-200">
                {result.possible_safety_issues.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 p-2 rounded bg-amber-950/20 border border-amber-500/20">
                    <span className="text-amber-400 font-bold">⚠️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Corrections */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-2">
              <h3 className="font-bold text-cyan-400 text-xs uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Suggested Actionable Corrections</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {result.suggested_corrections.map((item, idx) => (
                  <li key={idx} className="p-2 rounded bg-cyan-950/20 border border-cyan-500/20 text-cyan-200">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* Empty State */}
      {!result && !isAnalyzing && (
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center max-w-lg mx-auto space-y-3">
          <Wrench className="h-8 w-8 text-slate-500 mx-auto" />
          <h3 className="font-bold text-white text-base">Photograph Your Circuit To Test Wiring</h3>
          <p className="text-xs text-slate-400">
            Take a well-lit photo showing the breadboard rows, wire jumps, and component leads clearly. Or click <strong>Load Sample Circuit</strong> to see the safety engine in action!
          </p>
        </div>
      )}

    </div>
  );
};
