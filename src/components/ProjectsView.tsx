import React, { useState } from 'react';
import { 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Filter, 
  Layers, 
  ArrowRight,
  Cpu,
  Boxes,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { FeasibilityResult, ProjectDifficulty } from '../types/lab';

interface ProjectsViewProps {
  canBuildNow: FeasibilityResult[];
  canBuildWithAdditional: FeasibilityResult[];
  notFeasible: FeasibilityResult[];
  projectCounts: {
    uniqueProjects: number;
    projectVariants: number;
    experiments: number;
    byCategory: Record<string, number>;
    totalFeasibleNow: number;
  };
  onSelectProject: (result: FeasibilityResult) => void;
  onNavigateToScan: () => void;
  onNavigateToInventory: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  canBuildNow,
  canBuildWithAdditional,
  notFeasible,
  projectCounts,
  onSelectProject,
  onNavigateToScan,
  onNavigateToInventory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedStatusTab, setSelectedStatusTab] = useState<'CAN_BUILD_NOW' | 'CAN_BUILD_WITH_ADDITIONAL' | 'NOT_FEASIBLE'>('CAN_BUILD_NOW');

  const filterList = (list: FeasibilityResult[]) => {
    return list.filter(item => {
      const matchCat = selectedCategory === 'ALL' || item.project.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'ALL' || item.project.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });
  };

  const displayedList = 
    selectedStatusTab === 'CAN_BUILD_NOW' ? filterList(canBuildNow) :
    selectedStatusTab === 'CAN_BUILD_WITH_ADDITIONAL' ? filterList(canBuildWithAdditional) :
    filterList(notFeasible);

  const categories = [
    'ALL',
    'Robotics',
    'Arduino',
    'micro:bit',
    'ESP32',
    'Smart Agriculture',
    'IoT',
    'Physics',
    'Electronics',
    'Sensors'
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner & Project Engine Statistics */}
      <div className="rounded-2xl p-6 bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Project Feasibility & Hardware Compatibility Engine</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">What Can I Build With My Lab Stock?</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Strictly calculated from your currently working components. No inflated counts.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onNavigateToScan}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-medium cursor-pointer"
            >
              Scan New Components
            </button>
            <button
              onClick={onNavigateToInventory}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer"
            >
              Manage Lab Stock
            </button>
          </div>
        </div>

        {/* Project Counts Metrics (Requirement 13 & 30) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Projects Possible Now</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {projectCounts.totalFeasibleNow}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Unique Major Projects</span>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">
              {projectCounts.uniqueProjects}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Project Variants</span>
            <span className="text-2xl font-extrabold text-amber-400 font-mono">
              {projectCounts.projectVariants}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Science Experiments</span>
            <span className="text-2xl font-extrabold text-purple-400 font-mono">
              {projectCounts.experiments}
            </span>
          </div>
        </div>

        {/* Category Breakdown Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {Object.entries(projectCounts.byCategory).map(([cat, count]) => (
            <span key={cat} className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700/60">
              {cat}: <strong className="text-cyan-300 font-mono">{count}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* Status Segment Tabs: Can Build Now vs Missing Parts vs Infeasible */}
      <div className="flex space-x-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setSelectedStatusTab('CAN_BUILD_NOW')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            selectedStatusTab === 'CAN_BUILD_NOW'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>🟢 CAN BUILD NOW ({canBuildNow.length})</span>
        </button>

        <button
          onClick={() => setSelectedStatusTab('CAN_BUILD_WITH_ADDITIONAL')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            selectedStatusTab === 'CAN_BUILD_WITH_ADDITIONAL'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>🟡 CAN BUILD WITH ADDITIONAL PARTS ({canBuildWithAdditional.length})</span>
        </button>

        <button
          onClick={() => setSelectedStatusTab('NOT_FEASIBLE')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            selectedStatusTab === 'NOT_FEASIBLE'
              ? 'bg-rose-500 text-slate-950 font-bold shadow-lg shadow-rose-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <XCircle className="h-4 w-4" />
          <span>🔴 NOT CURRENTLY FEASIBLE ({notFeasible.length})</span>
        </button>
      </div>

      {/* Category & Difficulty Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-slate-400 font-semibold mr-1 flex items-center space-x-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Category:</span>
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-slate-400 font-semibold">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="ALL">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Project Cards Grid */}
      {displayedList.length === 0 ? (
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center space-y-2">
          <p className="text-slate-400 text-sm">No projects match the selected category/difficulty under this status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedList.map((res, idx) => {
            const proj = res.project;
            const isCanBuild = res.status === 'CAN_BUILD_NOW';
            const isPartial = res.status === 'CAN_BUILD_WITH_ADDITIONAL';

            return (
              <div
                key={idx}
                onClick={() => onSelectProject(res)}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5 ${
                  isCanBuild
                    ? 'border-emerald-500/40 bg-slate-900/80 hover:border-emerald-400'
                    : isPartial
                    ? 'border-amber-500/30 bg-slate-900/70 hover:border-amber-400'
                    : 'border-slate-800 bg-slate-900/40 opacity-75'
                }`}
              >
                <div className="space-y-3">
                  {/* Status & Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {proj.category}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      isCanBuild ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      isPartial ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {isCanBuild ? '🟢 CAN BUILD NOW' : isPartial ? '🟡 MISSING PARTS' : '🔴 NOT FEASIBLE'}
                    </span>
                  </div>

                  {/* Title & Objective */}
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-cyan-300">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {proj.objective}
                    </p>
                  </div>

                  {/* Missing Parts Pill Box if partial */}
                  {isPartial && res.missing_components.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-200 space-y-1">
                      <span className="font-semibold text-amber-300 block">Missing in Lab:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                        {res.missing_components.slice(0, 3).map((m, i) => (
                          <li key={i}>Need {m.needed}x {m.name}</li>
                        ))}
                        {res.missing_components.length > 3 && (
                          <li className="text-amber-400">+{res.missing_components.length - 3} more parts</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Power Warning if any */}
                  {res.power_warnings.length > 0 && (
                    <div className="p-2 rounded bg-rose-950/20 border border-rose-500/20 text-[11px] text-rose-300">
                      ⚠️ {res.power_warnings[0]}
                    </div>
                  )}
                </div>

                {/* Footer Info */}
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    Board: {proj.programming_board}
                  </span>
                  <div className="flex items-center space-x-1 text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>View Blueprint</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
