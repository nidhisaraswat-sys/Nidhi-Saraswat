import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { ScanView } from './components/ScanView';
import { ProjectsView } from './components/ProjectsView';
import { CompatibilityView } from './components/CompatibilityView';
import { CircuitCheckerView } from './components/CircuitCheckerView';
import { InventoryView } from './components/InventoryView';
import { TeacherModeView } from './components/TeacherModeView';
import { TestScenariosView } from './components/TestScenariosView';
import { ComponentDetailModal } from './components/ComponentDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';

import { DEFAULT_LAB_INVENTORY } from './data/defaultInventory';
import { COMPONENT_DATABASE } from './data/componentDatabase';
import { TestScenario } from './data/testScenarios';
import { evaluateAllProjects } from './services/feasibilityEngine';
import { 
  InventoryItem, 
  DetectedComponent, 
  LabComponent, 
  FeasibilityResult 
} from './types/lab';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('scan');

  // Lab stock state (persists in localStorage)
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ATL_LAB_INVENTORY');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load inventory from localStorage', e);
    }
    return DEFAULT_LAB_INVENTORY;
  });

  // Detected components from camera / photo scan
  const [detectedComponents, setDetectedComponents] = useState<DetectedComponent[]>([]);

  // Modals state
  const [modalComponent, setModalComponent] = useState<{ comp: LabComponent; detected?: DetectedComponent } | null>(null);
  const [modalProject, setModalProject] = useState<FeasibilityResult | null>(null);

  // Pre-selected compatibility pair
  const [compatPair, setCompatPair] = useState<[string, string]>(['arduino-uno-r3', 'hc-sr04-ultrasonic']);

  // Persist inventory
  useEffect(() => {
    try {
      localStorage.setItem('ATL_LAB_INVENTORY', JSON.stringify(inventory));
    } catch (e) {
      console.error('Failed to persist inventory', e);
    }
  }, [inventory]);

  // Combine working inventory with any newly scanned items for project feasibility
  // Only working_qty > 0 is used!
  const effectiveStock = inventory.map(item => ({
    name: item.name,
    quantity: item.working_qty
  }));

  // If user has scanned items on the bench, merge them in as detected additions
  for (const det of detectedComponents) {
    const existing = effectiveStock.find(i => i.name.toLowerCase() === det.name.toLowerCase());
    if (existing) {
      existing.quantity = Math.max(existing.quantity, det.quantity);
    } else {
      effectiveStock.push({ name: det.name, quantity: det.quantity });
    }
  }

  // Calculate project feasibilities
  const { canBuildNow, canBuildWithAdditional, notFeasible, counts } = evaluateAllProjects(effectiveStock);

  // Reset inventory to school standard
  const handleResetInventory = () => {
    setInventory(DEFAULT_LAB_INVENTORY);
  };

  // Run a test scenario
  const handleRunTest = (scenario: TestScenario) => {
    if (scenario.detectedComponents.length > 0) {
      setDetectedComponents(scenario.detectedComponents);
      setActiveTab('scan');
    } else if (scenario.compatibilityPair) {
      setCompatPair(scenario.compatibilityPair);
      setActiveTab('compatibility');
    } else if (scenario.circuitCheckResult) {
      setActiveTab('circuit-check');
    }
  };

  const handleOpenComponentDetail = (comp: LabComponent, detected?: DetectedComponent) => {
    setModalComponent({ comp, detected });
  };

  const handleCheckCompatibilityWith = (compId: string) => {
    setCompatPair([compId, 'arduino-uno-r3']);
    setActiveTab('compatibility');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        feasibleProjectsCount={counts.totalFeasibleNow}
        inventoryCount={inventory.length}
        onQuickScanClick={() => setActiveTab('scan')}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'scan' && (
          <ScanView
            onScanComplete={(comps) => setDetectedComponents(comps)}
            onOpenComponentDetail={handleOpenComponentDetail}
            onNavigateToProjects={() => setActiveTab('projects')}
            detectedList={detectedComponents}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            canBuildNow={canBuildNow}
            canBuildWithAdditional={canBuildWithAdditional}
            notFeasible={notFeasible}
            projectCounts={counts}
            onSelectProject={(res) => setModalProject(res)}
            onNavigateToScan={() => setActiveTab('scan')}
            onNavigateToInventory={() => setActiveTab('inventory')}
          />
        )}

        {activeTab === 'compatibility' && (
          <CompatibilityView
            initialCompA={compatPair[0]}
            initialCompB={compatPair[1]}
          />
        )}

        {activeTab === 'circuit-check' && (
          <CircuitCheckerView />
        )}

        {activeTab === 'inventory' && (
          <InventoryView
            inventory={inventory}
            onUpdateInventory={setInventory}
            onResetDefault={handleResetInventory}
            onNavigateToProjects={() => setActiveTab('projects')}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherModeView />
        )}

        {activeTab === 'tests' && (
          <TestScenariosView
            onRunTest={handleRunTest}
          />
        )}
      </main>

      {/* Component Detail & Scientific Explanation Modal */}
      {modalComponent && (
        <ComponentDetailModal
          component={modalComponent.comp}
          detectedInfo={modalComponent.detected}
          onClose={() => setModalComponent(null)}
          onCheckCompatibilityWith={handleCheckCompatibilityWith}
        />
      )}

      {/* Project Blueprint & Code Modal */}
      {modalProject && (
        <ProjectDetailModal
          feasibility={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}

      {/* Lab Safety Footer Bar */}
      <footer className="bg-slate-900/80 border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-400">
        <p>
          AI Science Lab Assistant • Intelligent Laboratory Component Recognition & Learning System • Built for ATL & School Robotics Labs
        </p>
      </footer>

    </div>
  );
}
