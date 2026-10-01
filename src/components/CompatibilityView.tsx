import React, { useState } from 'react';
import { 
  GitCompare, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  ArrowRight,
  Calculator,
  Info
} from 'lucide-react';
import { COMPONENT_DATABASE } from '../data/componentDatabase';
import { checkComponentCompatibility } from '../services/feasibilityEngine';

interface CompatibilityViewProps {
  initialCompA?: string;
  initialCompB?: string;
}

export const CompatibilityView: React.FC<CompatibilityViewProps> = ({
  initialCompA = 'arduino-uno-r3',
  initialCompB = 'hc-sr04-ultrasonic'
}) => {
  const [compAId, setCompAId] = useState<string>(initialCompA);
  const [compBId, setCompBId] = useState<string>(initialCompB);

  // Power calculator state
  const [selectedBoard, setSelectedBoard] = useState<'arduino-uno' | 'esp32' | 'microbit'>('arduino-uno');
  const [servoCount, setServoCount] = useState<number>(0);
  const [motorCount, setMotorCount] = useState<number>(0);
  const [pumpCount, setPumpCount] = useState<number>(0);
  const [ledCount, setLedCount] = useState<number>(2);

  const report = checkComponentCompatibility(compAId, compBId);
  const compA = COMPONENT_DATABASE.find(c => c.id === compAId);
  const compB = COMPONENT_DATABASE.find(c => c.id === compBId);

  // Power Check Calculations
  const boardLimits = {
    'arduino-uno': { voltage: '5.0V', maxCurrentMa: 400, name: 'Arduino UNO (Onboard 5V regulator via USB/VIN)' },
    'esp32': { voltage: '3.3V', maxCurrentMa: 250, name: 'ESP32 (3.3V LDO regulator on board)' },
    'microbit': { voltage: '3.3V', maxCurrentMa: 190, name: 'BBC micro:bit v2 (Edge connector 3V ring)' }
  };

  const totalDemandMa = 
    (servoCount * 250) + 
    (motorCount * 600) + 
    (pumpCount * 300) + 
    (ledCount * 20);

  const boardLimit = boardLimits[selectedBoard].maxCurrentMa;
  const isPowerOverloaded = totalDemandMa > boardLimit;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <GitCompare className="h-3.5 w-3.5" />
          <span>Electrical Compatibility & Power Safety Engine</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Component Compatibility & Safety Checker</h1>
        <p className="text-xs text-slate-300">
          Verify voltage matching, logic level safety (3.3V vs 5V), GPIO current limits, and driver requirements before connecting physical wires.
        </p>
      </div>

      {/* Component Selection Grid */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Zap className="h-4 w-4 text-cyan-400" />
          <span>Select Any Two Components To Test</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Component A */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">First Component (e.g. Controller / Supply)</label>
            <select
              value={compAId}
              onChange={(e) => setCompAId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              {COMPONENT_DATABASE.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.category})
                </option>
              ))}
            </select>

            {compA && (
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p><strong className="text-slate-300">Voltage:</strong> {compA.voltage}</p>
                <p><strong className="text-slate-300">Logic:</strong> {compA.logic_level}</p>
                <p><strong className="text-slate-300">Max Pin Current:</strong> {compA.current}</p>
              </div>
            )}
          </div>

          {/* Component B */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">Second Component (e.g. Sensor / Actuator / Load)</label>
            <select
              value={compBId}
              onChange={(e) => setCompBId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              {COMPONENT_DATABASE.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.category})
                </option>
              ))}
            </select>

            {compB && (
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p><strong className="text-slate-300">Voltage:</strong> {compB.voltage}</p>
                <p><strong className="text-slate-300">Logic:</strong> {compB.logic_level}</p>
                <p><strong className="text-slate-300">Current Demand:</strong> {compB.current}</p>
              </div>
            )}
          </div>
        </div>

        {/* Compatibility Verdict Banner */}
        <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
          report.status === 'SAFE_AND_COMPATIBLE' ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' :
          report.status === 'NEEDS_DRIVER_OR_LEVEL_SHIFT' ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' :
          'bg-rose-950/40 border-rose-500/40 text-rose-200'
        }`}>
          {report.status === 'SAFE_AND_COMPATIBLE' ? <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" /> :
           report.status === 'NEEDS_DRIVER_OR_LEVEL_SHIFT' ? <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0" /> :
           <XCircle className="h-6 w-6 text-rose-400 shrink-0" />}
          <div>
            <h3 className="font-bold text-sm uppercase">
              {report.status === 'SAFE_AND_COMPATIBLE' ? '🟢 Safe and Directly Compatible' :
               report.status === 'NEEDS_DRIVER_OR_LEVEL_SHIFT' ? '🟡 Conditional: Requires Driver or Voltage Level Shift' :
               '🔴 DANGEROUS / INCOMPATIBLE (Do Not Connect Directly!)'}
            </h3>
            <p className="text-xs mt-0.5 opacity-90">
              {report.driver_requirements.length > 0 
                ? `Required Interface: ${report.driver_requirements.join(', ')}`
                : 'Direct connection supported under standard laboratory limits.'}
            </p>
          </div>
        </div>

        {/* Electrical Parameter Checks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Voltage */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-300 block">1. Supply Voltage Check</span>
            <p className="text-slate-400">{report.voltage_check.details}</p>
          </div>

          {/* Current */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-300 block">2. Current & GPIO Limits</span>
            <p className="text-slate-400">{report.current_check.details}</p>
          </div>

          {/* Logic Level */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-300 block">3. Logic Level Safety</span>
            <p className="text-slate-400">{report.logic_level_check.details}</p>
          </div>
        </div>

        {/* Recommended Wiring */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <h4 className="font-bold text-cyan-300 text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <Info className="h-4 w-4" />
            <span>Recommended Wiring & Interfacing Guideline</span>
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed font-mono">
            {report.recommended_wiring}
          </p>
        </div>

        {/* Safety Warnings */}
        {report.safety_warnings.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 text-xs space-y-1">
            <strong className="text-rose-400 block font-semibold flex items-center space-x-1.5">
              <ShieldAlert className="h-4 w-4" />
              <span>Safety Warnings:</span>
            </strong>
            <ul className="list-disc list-inside space-y-0.5">
              {report.safety_warnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* DEDICATED POWER CHECK CALCULATOR (Requirement 19) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-5">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Laboratory Power Check Calculator</h2>
            <p className="text-xs text-slate-400">
              Calculate total active current demand to prevent microcontroller brownout or melted voltage regulators.
            </p>
          </div>
        </div>

        {/* Controller Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {[
            { id: 'arduino-uno', name: 'Arduino UNO (5V)', max: '400mA' },
            { id: 'esp32', name: 'ESP32 (3.3V)', max: '250mA' },
            { id: 'microbit', name: 'BBC micro:bit (3.3V)', max: '190mA' }
          ].map(board => (
            <button
              key={board.id}
              onClick={() => setSelectedBoard(board.id as any)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedBoard === board.id
                  ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="block font-semibold text-slate-200">{board.name}</span>
              <span className="text-[11px] text-amber-300 font-mono">Regulator limit: {board.max}</span>
            </button>
          ))}
        </div>

        {/* Loads Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-300 font-semibold block">SG90 Servos (250mA ea)</span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setServoCount(Math.max(0, servoCount - 1))}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >-</button>
              <span className="font-mono font-bold text-white">{servoCount}</span>
              <button 
                onClick={() => setServoCount(servoCount + 1)}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >+</button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-300 font-semibold block">BO Motors (600mA ea)</span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setMotorCount(Math.max(0, motorCount - 1))}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >-</button>
              <span className="font-mono font-bold text-white">{motorCount}</span>
              <button 
                onClick={() => setMotorCount(motorCount + 1)}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >+</button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-300 font-semibold block">Water Pumps (300mA ea)</span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setPumpCount(Math.max(0, pumpCount - 1))}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >-</button>
              <span className="font-mono font-bold text-white">{pumpCount}</span>
              <button 
                onClick={() => setPumpCount(pumpCount + 1)}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >+</button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-300 font-semibold block">LEDs (20mA ea)</span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLedCount(Math.max(0, ledCount - 1))}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >-</button>
              <span className="font-mono font-bold text-white">{ledCount}</span>
              <button 
                onClick={() => setLedCount(ledCount + 1)}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
              >+</button>
            </div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isPowerOverloaded 
            ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' 
            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
        }`}>
          <div>
            <span className="text-xs uppercase font-bold block">
              Estimated Total Current Demand: <span className="font-mono text-base">{totalDemandMa} mA</span> / Limit: {boardLimit} mA
            </span>
            <p className="text-xs mt-0.5">
              {isPowerOverloaded
                ? '⚠️ CRITICAL: Exceeds onboard regulator capacity! Do NOT power these loads from the board 5V/3.3V rail. Power motors/servos from an external 18650 battery pack or 5V Buck Converter.'
                : '✓ Safe: Current demand is within standard onboard regulator thermal limits.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
