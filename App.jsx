import React, { useState } from 'react';
import { ClipboardCheck, AlertTriangle, Plus, Thermometer, CheckCircle2 } from 'lucide-react';

export default function KitchenComplianceApp() {
  const [logs, setLogs] = useState([
    { id: 1, unit: 'Walk-in Chiller 1', temp: 2.5, status: 'Normal', time: new Date().toLocaleTimeString() },
    { id: 2, unit: 'Fish Prep Fridge', temp: 4.0, status: 'Normal', time: new Date().toLocaleTimeString() },
    { id: 3, unit: 'Cook-line Freezer', temp: -18.5, status: 'Normal', time: new Date().toLocaleTimeString() },
  ]);

  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Pan-Seared Salmon & Puree', cost: 4.50, price: 18.00, margin: 75.0, allergens: 'Fish' },
    { id: 2, name: 'Wild Mushroom Risotto', cost: 3.20, price: 16.00, margin: 80.0, allergens: 'Dairy' },
  ]);

  const [newUnit, setNewUnit] = useState('');
  const [newTemp, setNewTemp] = useState('');

  const [recipeName, setRecipeName] = useState('');
  const [recipeCost, setRecipeCost] = useState('');
  const [recipePrice, setRecipePrice] = useState('');
  const [recipeAllergens, setRecipeAllergens] = useState('');

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newUnit || !newTemp) return;

    const tempVal = parseFloat(newTemp);
    const status = tempVal > 5.0 ? 'Action Required' : 'Normal';

    const entry = {
      id: Date.now(),
      unit: newUnit,
      temp: tempVal,
      status: status,
      time: new Date().toLocaleTimeString(),
    };

    setLogs([entry, ...logs]);
    setNewUnit('');
    setNewTemp('');
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (!recipeName || !recipeCost || !recipePrice) return;

    const costNum = parseFloat(recipeCost);
    const priceNum = parseFloat(recipePrice);
    const marginCalc = priceNum > 0 ? Math.round(((priceNum - costNum) / priceNum) * 100) : 0;

    const newRecipeItem = {
      id: Date.now(),
      name: recipeName,
      cost: costNum,
      price: priceNum,
      margin: marginCalc,
      allergens: recipeAllergens ? recipeAllergens : 'None',
    };

    setRecipes([newRecipeItem, ...recipes]);
    setRecipeName('');
    setRecipeCost('');
    setRecipePrice('');
    setRecipeAllergens('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Thermometer className="text-emerald-400" /> Kitchen Compliance & Margin Tracker
            </h1>
            <p className="text-sm text-slate-400">Live temperature logging and recipe margin analysis.</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg text-emerald-400 text-sm font-medium w-fit">
            <CheckCircle2 size={16} /> Audit Ready
          </div>
        </div>

        {/* Temperature Quick-Log Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Plus size={18} className="text-emerald-400" /> Log Unit Temperature
          </h2>
          <form onSubmit={handleAddLog} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Unit Name (e.g., Main Fridge)"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Temperature (°C)"
              value={newTemp}
              onChange={(e) => setNewTemp(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus size={16} /> Save Log
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
