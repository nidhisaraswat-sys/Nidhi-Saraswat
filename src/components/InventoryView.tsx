import React, { useState } from 'react';
import { 
  Boxes, 
  Plus, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Edit3,
  Save,
  Filter
} from 'lucide-react';
import { InventoryItem, ComponentCategory } from '../types/lab';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onUpdateInventory: (items: InventoryItem[]) => void;
  onResetDefault: () => void;
  onNavigateToProjects: () => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  onUpdateInventory,
  onResetDefault,
  onNavigateToProjects
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New item form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ComponentCategory>('Sensor');
  const [newTotal, setNewTotal] = useState(5);
  const [newWorking, setNewWorking] = useState(5);
  const [newDamaged, setNewDamaged] = useState(0);

  const categories: (ComponentCategory | 'ALL')[] = [
    'ALL',
    'Microcontroller & Brain',
    'Sensor',
    'Actuator & Motor',
    'Driver & Controller',
    'Power & Battery',
    'Passive & Semiconductor',
    'Display & Communication',
    'Robotics & Mechanical',
    'Prototyping & Tools'
  ];

  const handleWorkingQtyChange = (id: string, delta: number) => {
    const updated = inventory.map(item => {
      if (item.id === id) {
        const nextWorking = Math.max(0, Math.min(item.total_qty, item.working_qty + delta));
        const nextDamaged = item.total_qty - nextWorking;
        return {
          ...item,
          working_qty: nextWorking,
          damaged_qty: nextDamaged,
          available_qty: nextWorking
        };
      }
      return item;
    });
    onUpdateInventory(updated);
  };

  const handleTotalQtyChange = (id: string, newTotal: number) => {
    if (newTotal < 0) return;
    const updated = inventory.map(item => {
      if (item.id === id) {
        const working = Math.min(newTotal, item.working_qty);
        const damaged = newTotal - working;
        return {
          ...item,
          total_qty: newTotal,
          working_qty: working,
          damaged_qty: damaged,
          available_qty: working
        };
      }
      return item;
    });
    onUpdateInventory(updated);
  };

  const handleAddNewItem = () => {
    if (!newName.trim()) return;
    const newItem: InventoryItem = {
      id: `custom-inv-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      total_qty: newTotal,
      working_qty: newWorking,
      damaged_qty: newDamaged,
      available_qty: newWorking,
      unit: 'pcs'
    };
    onUpdateInventory([newItem, ...inventory]);
    setIsAddingNew(false);
    setNewName('');
    setNewTotal(5);
    setNewWorking(5);
    setNewDamaged(0);
  };

  const filteredInventory = inventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const totalUnits = inventory.reduce((sum, item) => sum + item.total_qty, 0);
  const workingUnits = inventory.reduce((sum, item) => sum + item.working_qty, 0);
  const damagedUnits = inventory.reduce((sum, item) => sum + item.damaged_qty, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-1">
              <Boxes className="h-3.5 w-3.5" />
              <span>School Laboratory Stock Management</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">My Lab Inventory</h1>
            <p className="text-xs text-slate-400">
              Only components marked as <strong>Working & Available</strong> are used when generating feasible project blueprints.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer shadow"
            >
              <Plus className="h-4 w-4" />
              <span>Add Custom Component</span>
            </button>
            <button
              onClick={onResetDefault}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to School Default</span>
            </button>
          </div>
        </div>

        {/* Inventory Summary Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Total Inventory Stock</span>
            <span className="text-2xl font-extrabold text-white font-mono">{totalUnits} <span className="text-xs font-normal text-slate-400">units</span></span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Working & Ready (Usable)</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">{workingUnits} <span className="text-xs font-normal text-slate-400">units</span></span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Damaged / In Repair</span>
            <span className="text-2xl font-extrabold text-rose-400 font-mono">{damagedUnits} <span className="text-xs font-normal text-slate-400">units</span></span>
          </div>
        </div>
      </div>

      {/* Add New Item Form Drawer */}
      {isAddingNew && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm">Add New Component to Lab Inventory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">Component Name</label>
              <input
                type="text"
                placeholder="e.g. Ultrasonic Sensor HC-SR04"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                {categories.filter(c => c !== 'ALL').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">Total Stock Quantity</label>
              <input
                type="number"
                min="1"
                value={newTotal}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setNewTotal(val);
                  setNewWorking(val);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNewItem}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              Save Component
            </button>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search component by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
          <span className="text-slate-400 font-semibold mr-1">Category:</span>
          {categories.slice(0, 6).map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Component Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Total Stock</th>
                <th className="py-3 px-4 text-center">Working (Usable)</th>
                <th className="py-3 px-4 text-center">Damaged</th>
                <th className="py-3 px-4 text-center">Available For Projects</th>
                <th className="py-3 px-4 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40">
              {filteredInventory.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-200">
                    {item.total_qty}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                    {item.working_qty}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-rose-400">
                    {item.damaged_qty}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-cyan-300">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
                      {item.available_qty} {item.unit || 'pcs'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center space-x-1.5">
                      <button
                        title="Mark one damaged"
                        onClick={() => handleWorkingQtyChange(item.id, -1)}
                        className="px-2 py-0.5 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 font-bold cursor-pointer"
                      >
                        -1 Damaged
                      </button>
                      <button
                        title="Mark one repaired/working"
                        onClick={() => handleWorkingQtyChange(item.id, 1)}
                        className="px-2 py-0.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 font-bold cursor-pointer"
                      >
                        +1 Working
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
