import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  ShieldAlert, 
  RefreshCw, 
  Plus, 
  Info,
  Maximize2
} from 'lucide-react';
import { DetectedComponent, LabComponent } from '../types/lab';
import { COMPONENT_DATABASE } from '../data/componentDatabase';

interface ScanViewProps {
  onScanComplete: (components: DetectedComponent[]) => void;
  onOpenComponentDetail: (component: LabComponent, detected: DetectedComponent) => void;
  onNavigateToProjects: () => void;
  detectedList: DetectedComponent[];
}

export const ScanView: React.FC<ScanViewProps> = ({
  onScanComplete,
  onOpenComponentDetail,
  onNavigateToProjects,
  detectedList
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setIsCameraActive(false);
      setErrorMsg('Could not access device camera. Please check browser permissions or upload a photograph file.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      stopCamera();
      analyzeImage(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64Image: string) => {
    setIsScanning(true);
    setErrorMsg(null);

    // Visual reasoning pipeline steps
    const steps = [
      '1/7 Inspecting image quality & optical clarity...',
      '2/7 Running multi-object boundary detection...',
      '3/7 Matching components against school lab inventory...',
      '4/7 Verifying pin configurations & markings...',
      '5/7 Assessing confidence & filtering hallucinations...',
      '6/7 Generating technical & scientific principles...',
      '7/7 Calculating project compatibility & power safety...'
    ];

    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setScanStep(steps[currentStep]);
      }
    }, 700);

    setScanStep(steps[0]);

    try {
      const response = await fetch('/api/analyze-components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType: 'image/jpeg'
        })
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const detected = (data.components || []) as DetectedComponent[];

      // Match each detected item to our internal component database if possible
      const enriched = detected.map(d => {
        const norm = d.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const matched = COMPONENT_DATABASE.find(c => {
          const cNorm = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          return cNorm.includes(norm) || norm.includes(cNorm) || c.aliases.some(a => norm.includes(a.toLowerCase().replace(/[^a-z0-9]/g, '')));
        });
        return {
          ...d,
          matched_id: matched?.id
        };
      });

      onScanComplete(enriched);
      setIsScanning(false);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Scan error:', err);
      setIsScanning(false);
      setErrorMsg('Failed to analyze image via server. You can still test any of the 12 verified test kit scenarios using the top bar!');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Hero Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>School Science, ATL & Robotics Laboratory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Intelligent Component Recognition & Project Engine
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Photograph any individual component, kit, or full lab workbench. The AI identifies every visible part, explains its scientific operating principle, tests compatibility, and discovers projects you can build right now.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                if (isCameraActive) capturePhoto();
                else startCamera();
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 text-xs sm:text-sm cursor-pointer transition-all"
            >
              <Camera className="h-4 w-4" />
              <span>{isCameraActive ? 'Capture Photo Now' : '📷 Take Photo (Camera)'}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer transition-all"
            >
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Upload Photograph</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>
      </div>

      {/* Camera Live Viewfinder */}
      {isCameraActive && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3 shadow-2xl max-w-xl mx-auto">
          <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-2 border-dashed border-cyan-500/40 pointer-events-none rounded-xl m-4 flex items-center justify-center">
              <span className="text-xs bg-black/60 px-3 py-1 rounded text-cyan-300 font-mono">
                Center components in frame
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={stopCamera}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              Cancel Camera
            </button>
            <button
              onClick={capturePhoto}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs cursor-pointer shadow-md"
            >
              <Camera className="h-4 w-4" />
              <span>Snap & Analyze Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Scanning Pipeline Progress Card */}
      {isScanning && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-xl space-y-4 max-w-xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-cyan-500/10 text-cyan-400 animate-spin">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Vision Analysis in Progress</h3>
            <p className="text-xs text-cyan-300 font-mono mt-1">{scanStep}</p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-1.5 rounded-full animate-pulse w-3/4"></div>
          </div>
          <p className="text-[11px] text-slate-400">
            Applying strict anti-hallucination confidence rules and school inventory cross-referencing.
          </p>
        </div>
      )}

      {/* Scan Results View */}
      {detectedList.length > 0 && !isScanning && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>Recognized Components ({detectedList.length})</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                  {detectedList.reduce((acc, c) => acc + c.quantity, 0)} Total Units
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Click any component card for working principles, pins, and safety guidelines.
              </p>
            </div>

            <button
              onClick={onNavigateToProjects}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Lightbulb className="h-4 w-4" />
              <span>What Can I Build With These?</span>
            </button>
          </div>

          {/* Grid of Component Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectedList.map((comp, idx) => {
              const matchedDbComp = COMPONENT_DATABASE.find(c => c.id === comp.matched_id);
              const isHigh = comp.confidence_level === 'HIGH';
              const isLow = comp.confidence_level === 'LOW' || comp.confidence_level === 'UNKNOWN';

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase">
                          Component #{comp.component_number} • {comp.category}
                        </span>
                        <h3 className="font-bold text-white text-sm mt-0.5">{comp.name}</h3>
                      </div>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        isHigh ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        isLow ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {comp.confidence}% {comp.confidence_level}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="text-xs text-slate-400 flex items-center space-x-2">
                      <span>Quantity Visible:</span>
                      <span className="font-bold text-cyan-300 font-mono text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {comp.quantity}x
                      </span>
                    </div>

                    {/* Evidence & Visual clues */}
                    {comp.evidence && (
                      <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] space-y-1">
                        <span className="text-slate-400 block font-semibold">Evidence:</span>
                        {comp.evidence.visible_markings && (
                          <p className="text-slate-300 font-mono truncate">"{comp.evidence.visible_markings}"</p>
                        )}
                        {comp.evidence.physical_type && (
                          <p className="text-slate-400">{comp.evidence.physical_type}</p>
                        )}
                      </div>
                    )}

                    {/* Warning if low confidence */}
                    {isLow && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] flex items-start space-x-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>Uncertain identification. Please photograph closer or confirm model.</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        if (matchedDbComp) {
                          onOpenComponentDetail(matchedDbComp, comp);
                        } else {
                          // Create synthetic fallback
                          const syntheticComp: LabComponent = {
                            id: `custom-${idx}`,
                            name: comp.name,
                            aliases: [],
                            category: comp.category,
                            visual_features: comp.evidence?.visual_clues || [],
                            working_principle: 'Refer to component datasheet for precise operating dynamics.',
                            scientific_principle: 'Electronic semiconductor / transducer.',
                            what_is_it: comp.name,
                            what_it_does: 'Provides laboratory sensor / actuator functionality.',
                            inputs: 'Standard logic / voltage.',
                            outputs: 'Signals.',
                            pins: [],
                            voltage: 'Specification not verified',
                            current: 'Specification not verified',
                            logic_level: 'Specification not verified',
                            interfaces: [],
                            compatible_boards: ['Standard laboratory boards'],
                            common_projects: [],
                            required_drivers: [],
                            safety: ['Verify voltage levels before connecting.'],
                            never_connect_to: [],
                            student_summary: {
                              simple_definition: comp.name,
                              how_it_works_kid: 'Reads or acts upon electrical signals in your circuit.',
                              why_we_use_it: 'To build science and robotics lab prototypes.',
                              golden_safety_rule: 'Check electrical ratings first!'
                            }
                          };
                          onOpenComponentDetail(syntheticComp, comp);
                        }
                      }}
                      className="text-xs text-cyan-300 hover:text-cyan-200 font-semibold flex items-center space-x-1 cursor-pointer"
                    >
                      <Info className="h-3.5 w-3.5" />
                      <span>How It Works & Pins</span>
                    </button>

                    <span className="text-[11px] text-slate-500">
                      {matchedDbComp ? '✓ Database Verified' : 'Custom Sensor'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State when no scan yet */}
      {detectedList.length === 0 && !isScanning && (
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center max-w-lg mx-auto space-y-3">
          <div className="p-3 rounded-full bg-slate-800 text-slate-400 inline-flex">
            <Camera className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-white text-base">No Components Scanned Yet</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Click <strong>Take Photo</strong> to capture with your webcam/phone camera, or <strong>Upload Photograph</strong> of any parts lying on your lab table. Or click <strong>12 Test Scenarios</strong> above to run verified test kits instantly.
          </p>
        </div>
      )}

    </div>
  );
};
