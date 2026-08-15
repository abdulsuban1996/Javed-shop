'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Check, RefreshCw } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';

export default function AdminPaymentsPage() {
  const { settings, updateSettings } = useSettings();
  const [bkashNumber, setBkashNumber] = useState(settings.bkashNumber);
  const [nagadNumber, setNagadNumber] = useState(settings.nagadNumber);
  const [rocketNumber, setRocketNumber] = useState(settings.rocketNumber);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBkashNumber(settings.bkashNumber);
    setNagadNumber(settings.nagadNumber);
    setRocketNumber(settings.rocketNumber);
  }, [settings.bkashNumber, settings.nagadNumber, settings.rocketNumber]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings({
      bkashNumber: bkashNumber.trim(),
      nagadNumber: nagadNumber.trim(),
      rocketNumber: rocketNumber.trim(),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-[#0B1220] flex items-center gap-2">
          <CreditCard className="w-7 h-7 text-[#2563EB]" />
          <span>Payment Methods &amp; TrxID Settings</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">Configure bKash, Nagad, Rocket merchant/personal numbers displayed during checkout</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Payment accounts saved to Supabase cloud successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-[#E5E7EB]">
        <h2 className="text-base font-extrabold text-[#0B1220] border-b border-slate-100 pb-3">
          Mobile Banking Merchant &amp; Personal Numbers
        </h2>

        <div className="space-y-4 text-xs">
          
          <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-200 space-y-2">
            <label className="font-extrabold text-pink-700 block uppercase tracking-wider text-[11px]">bKash Personal / Merchant Number</label>
            <input
              type="text"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              placeholder="e.g. 01700-000000"
              className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-pink-300 focus:border-pink-600 focus:outline-none"
            />
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2">
            <label className="font-extrabold text-orange-700 block uppercase tracking-wider text-[11px]">Nagad Personal / Merchant Number</label>
            <input
              type="text"
              value={nagadNumber}
              onChange={(e) => setNagadNumber(e.target.value)}
              placeholder="e.g. 01800-000000"
              className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-orange-300 focus:border-orange-600 focus:outline-none"
            />
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
            <label className="font-extrabold text-purple-700 block uppercase tracking-wider text-[11px]">Rocket Personal / Merchant Number</label>
            <input
              type="text"
              value={rocketNumber}
              onChange={(e) => setRocketNumber(e.target.value)}
              placeholder="e.g. 01900-000000"
              className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-purple-300 focus:border-purple-600 focus:outline-none"
            />
          </div>

        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs transition shadow-sm flex items-center gap-2 disabled:opacity-50"
        >
          {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
          <span>{saving ? 'Saving to Cloud...' : 'Save Payment Settings'}</span>
        </button>
      </form>

    </div>
  );
}
