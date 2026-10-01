import React from 'react';
import { 
  Cpu, 
  Camera, 
  Boxes, 
  Lightbulb, 
  CheckCircle2, 
  GitCompare, 
  Wrench, 
  GraduationCap, 
  FlaskConical,
  ShieldAlert,
  Beaker
} from 'lucide-react';

export type NavTab = 
  | 'scan' 
  | 'projects' 
  | 'inventory' 
  | 'compatibility' 
  | 'circuit-check' 
  | 'teacher' 
  | 'tests';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  feasibleProjectsCount: number;
  inventoryCount: number;
  onQuickScanClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  feasibleProjectsCount,
  inventoryCount,
  onQuickScanClick
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('scan')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <FlaskConical className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white">AI SCIENCE LAB</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  ATL ASSISTANT
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Component Vision, Learning & Project Intelligence</p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="hidden lg:flex items-center space-x-3">
            <div 
              onClick={() => onTabChange('projects')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium cursor-pointer hover:bg-emerald-500/20 transition-all"
            >
              <Lightbulb className="h-4 w-4 text-emerald-400" />
              <span>Can Build Now:</span>
              <span className="bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-xs">
                {feasibleProjectsCount}
              </span>
            </div>

            <div 
              onClick={() => onTabChange('inventory')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-700/60 transition-all"
            >
              <Boxes className="h-4 w-4 text-cyan-400" />
              <span>Lab Stock:</span>
              <span className="text-cyan-300 font-mono font-semibold">{inventoryCount} items</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onQuickScanClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-semibold text-sm px-3.5 py-2 rounded-lg shadow-md hover:shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Scan Components</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/80 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onTabChange('scan')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'scan'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Camera className="h-4 w-4" />
            <span>Scan & Detect</span>
          </button>

          <button
            onClick={() => onTabChange('projects')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Lightbulb className="h-4 w-4" />
            <span>What Can I Build?</span>
            {feasibleProjectsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                {feasibleProjectsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('compatibility')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'compatibility'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <GitCompare className="h-4 w-4" />
            <span>Check Compatibility</span>
          </button>

          <button
            onClick={() => onTabChange('circuit-check')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'circuit-check'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Wrench className="h-4 w-4" />
            <span>Check My Circuit</span>
          </button>

          <button
            onClick={() => onTabChange('inventory')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Boxes className="h-4 w-4" />
            <span>My Lab Inventory</span>
          </button>

          <button
            onClick={() => onTabChange('teacher')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Teacher & Science Fair</span>
          </button>

          <button
            onClick={() => onTabChange('tests')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Beaker className="h-4 w-4" />
            <span>12 Test Scenarios</span>
          </button>
        </div>
      </div>
    </header>
  );
};
