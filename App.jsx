import React, { useState } from 'react';
import { ClipboardCheck, AlertTriangle, Plus, CheckCircle2, Thermometer, DollarSign, ShieldAlert, Utensils } from 'lucide-react';

export default function KitchenComplianceApp() {
  const [logs, setLogs] = useState([
    { id: 1, unit: 'Walk-in Chiller 1', temp: 3.2, status: 'Optimal', time: '08:30 AM' },
    { id: 2, unit: 'Fish Prep Fridge', temp: 4.8, status: 'Warning', time: '08:45 AM' },
    { id: 3, unit: 'Cook-line Freezer', temp: -18.5, status: 'Optimal', time: '09:00 AM' },
  ]);

  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Pan-Seared Salmon & Puree', cost: 4.50, price: 18.00, margin: '75%', allergens: ['Fish'] },
    { id: 2, name: 'Wild Mushroom Risotto', cost: 2.80, price: 15.00, margin: '81%', allergens: ['Dairy', 'Sulfites'] }
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
    const status = tempVal > 5.0 ? 'Action Required' : 'Optimal';
    
    const entry = {
      id: Date.now(),
      unit: newUnit,
      temp: tempVal,
      status: status,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
    const marginCalc = priceNum > 0 ? Math.round(((priceNum - costNum) / priceNum) * 100) + '%' : '0%';

    const newRecipeItem = {
      id: Date.now(),
      name: recipeName,
      cost: costNum,
      price: priceNum,
      margin: marginCalc,
      allergens: recipeAllergens ? recipeAllergens.split(',').map(s => s.trim()) : []
    };

    setRecipes([newRecipeItem, ...recipes]);
    setRecipeName('');
    setRecipeCost('');
    setRecipePrice('');
    setRecipeAllergens('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Thermometer className="text-emerald-400" /> KitchenGuard Ops
            </h1>
            <p className="text-sm text-slate-400">HACCP Temperature & Recipe Margin Control</p>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-800 px-4 py-2 rounded-lg text-emerald-400 text-sm font-medium flex items-center gap-2">
            <CheckCircle2 size={16} /> Audit Trail Active (75°C Standard)
          </div>
        </div>

        {/* Temperature Quick-Log Form */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Plus size={18} className="text-indigo-400" /> Log Probe / Fridge Reading
          </h2>
          <form onSubmit={handleAddLog} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Unit Name (e.g., Pastry Fridge)" 
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
            <input 
