'use client';

import React, { useState } from 'react';
import { CreditCard, Check, Smartphone } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [bkashNumber, setBkashNumber] = useState('01700-000000');
  const [nagadNumber, setNagadNumber] = useState('01800-000000');
  const [rocketNumber, setRocketNumber] = useState('01900-000000');
  const [codEnabled, setCodEnabled] = useState(true);
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
          <CreditCard className="w-7 h-7 text-purple-600" />
          <span>Payment Methods & TrxID Settings</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">Configure bKash, Nagad, Rocket numbers and Cash on Delivery</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Payment accounts updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-200/60 border border-slate-100">
        <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
          Mobile Banking Merchant & Personal Numbers
        </h2>

        <div className="space-y-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-200 space-y-2">
            <label className="font-extrabold text-pink-700 block">bKash Personal / Merchant Number</label>
            <input
              type="text"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-pink-300 focus:border-pink-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2">
            <label className="font-extrabold text-orange-700 block">Nagad Personal / Merchant Number</label>
            <input
              type="text"
              value={nagadNumber}
              onChange={(e) => setNagadNumber(e.target.value)}
              className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-orange-300 focus:border-orange-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
            <label className="font-extrabold text-purple-700 block">Rocket Personal / Merchant Number</label>
            <input
              type="text"
              value={rocketNumber}
              onChange={(e) => setRocketNumber(e.target.value)}
              className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-purple-300 focus:border-purple-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
            <div>
              <label className="font-extrabold text-emerald-800 block">Cash on Delivery (COD)</label>
              <p className="text-[11px] text-slate-500">Allow customers to pay cash upon product delivery nationwide</p>
            </div>
            <input
              type="checkbox"
              checked={codEnabled}
              onChange={(e) => setCodEnabled(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

        </div>

        <button
          type="submit"
          className="px-6 py-3.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs hover:bg-purple-700 transition shadow-md shadow-purple-500/20"
        >
          Save Payment Settings
        </button>
      </form>

    </div>
  );
}
