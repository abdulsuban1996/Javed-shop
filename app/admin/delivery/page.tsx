'use client';

import React, { useState } from 'react';
import { Truck, Check, Edit2 } from 'lucide-react';

export default function AdminDeliveryPage() {
  const [insideDhaka, setInsideDhaka] = useState('60');
  const [outsideDhaka, setOutsideDhaka] = useState('120');
  const [expressDhaka, setExpressDhaka] = useState('150');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Truck className="w-7 h-7 text-purple-600" />
          <span>Delivery Zones & Shipping Fees</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">Configure Bangladeshi delivery charges for checkout calculator</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Shipping rates updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-200/60 border border-slate-100">
        <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
          Bangladeshi Courier Rates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
          
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="font-bold text-slate-800 block">Inside Dhaka (Regular)</label>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-500">৳</span>
              <input
                type="number"
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(e.target.value)}
                className="w-full bg-white text-slate-900 font-bold rounded-xl p-2.5 border border-slate-300 focus:border-purple-600"
              />
            </div>
            <p className="text-[11px] text-slate-400">1-2 Business Days</p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="font-bold text-slate-800 block">Outside Dhaka (Nationwide)</label>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-500">৳</span>
              <input
                type="number"
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(e.target.value)}
                className="w-full bg-white text-slate-900 font-bold rounded-xl p-2.5 border border-slate-300 focus:border-purple-600"
              />
            </div>
            <p className="text-[11px] text-slate-400">2-4 Business Days via Steadfast / RedX</p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="font-bold text-slate-800 block">Dhaka Same-Day Express</label>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-500">৳</span>
              <input
                type="number"
                value={expressDhaka}
                onChange={(e) => setExpressDhaka(e.target.value)}
                className="w-full bg-white text-slate-900 font-bold rounded-xl p-2.5 border border-slate-300 focus:border-purple-600"
              />
            </div>
            <p className="text-[11px] text-slate-400">Same Day Delivery (Pathao / Paperfly)</p>
          </div>

        </div>

        <button
          type="submit"
          className="px-6 py-3.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs hover:bg-purple-700 transition shadow-md shadow-purple-500/20"
        >
          Save Delivery Rates
        </button>
      </form>

    </div>
  );
}
