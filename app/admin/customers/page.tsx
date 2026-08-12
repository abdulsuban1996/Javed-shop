'use client';

import React, { useState } from 'react';
import { Users, Search, Phone, MapPin, ShoppingBag } from 'lucide-react';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const [customers] = useState([
    { id: '1', name: 'Saddam Hossen', phone: '01854213620', location: 'Uttara, Dhaka', total_orders: 3, total_spent: 3410, joined: '01 Aug 2026' },
    { id: '2', name: 'Tanvir Ahmed', phone: '01712345678', location: 'GEC Circle, Chittagong', total_orders: 1, total_spent: 1550, joined: '05 Aug 2026' },
    { id: '3', name: 'Siam Hossain', phone: '01898765432', location: 'Zindabazar, Sylhet', total_orders: 2, total_spent: 4980, joined: '08 Aug 2026' },
    { id: '4', name: 'Rahim Uddin', phone: '01911223344', location: 'Dhanmondi, Dhaka', total_orders: 1, total_spent: 1850, joined: '10 Aug 2026' },
  ]);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-purple-600" />
            <span>Customer Directory</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Registered customers & order history overview</p>
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Name, Phone, Location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 bg-white text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-purple-600 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-extrabold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">CUSTOMER NAME</th>
                <th className="py-3 px-3">PHONE</th>
                <th className="py-3 px-3">LOCATION</th>
                <th className="py-3 px-3">TOTAL ORDERS</th>
                <th className="py-3 px-3 text-right">TOTAL SPENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-3 font-bold text-slate-900">
                    <div>{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">Customer since {c.joined}</div>
                  </td>
                  <td className="py-4 px-3 font-semibold text-purple-700 font-mono">{c.phone}</td>
                  <td className="py-4 px-3 text-slate-600 font-medium">{c.location}</td>
                  <td className="py-4 px-3">
                    <span className="bg-purple-100 text-purple-700 font-extrabold px-3 py-1 rounded-full text-[11px]">
                      {c.total_orders} Orders
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right font-black text-emerald-600">
                    ৳{c.total_spent.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
