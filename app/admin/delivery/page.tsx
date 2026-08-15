'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Check, RefreshCw } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';

export default function AdminDeliveryPage() {
  const { settings, updateSettings } = useSettings();
  const [insideDhaka, setInsideDhaka] = useState(settings.insideDhakaFee.toString());
  const [outsideDhaka, setOutsideDhaka] = useState(settings.outsideDhakaFee.toString());
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setInsideDhaka(settings.insideDhakaFee.toString());
    setOutsideDhaka(settings.outsideDhakaFee.toString());
  }, [settings.insideDhakaFee, settings.outsideDhakaFee]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings({
      insideDhakaFee: parseFloat(insideDhaka) || 60,
      outsideDhakaFee: parseFloat(outsideDhaka) || 120,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-[#0B1220] flex items-center gap-2">
          <Truck className="w-7 h-7 text-[#2563EB]" />
          <span>Delivery Zones &amp; Shipping Fees</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">Configure Bangladeshi delivery charges for customer checkout calculator</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Shipping rates saved to Supabase cloud successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-[#E5E7EB]">
        <h2 className="text-base font-extrabold text-[#0B1220] border-b border-slate-100 pb-3">
          Bangladeshi Courier Rates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="font-bold text-slate-800 block">Inside Dhaka (Regular Delivery)</label>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-500 text-base">৳</span>
              <input
                type="number"
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(e.target.value)}
                className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-slate-300 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400">1-2 Business Days delivery</p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="font-bold text-slate-800 block">Outside Dhaka (Nationwide Delivery)</label>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-500 text-base">৳</span>
              <input
                type="number"
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(e.target.value)}
                className="w-full bg-white text-slate-900 font-bold rounded-xl p-3 border border-slate-300 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400">2-4 Business Days via Steadfast / RedX / Paperfly</p>
          </div>

        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs transition shadow-sm flex items-center gap-2 disabled:opacity-50"
        >
          {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
          <span>{saving ? 'Saving to Cloud...' : 'Save Delivery Rates'}</span>
        </button>
      </form>

    </div>
  );
}
