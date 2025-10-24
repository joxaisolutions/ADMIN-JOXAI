'use client';

import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useState } from 'react';
import { CreditCard, TrendingUp, Users, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function SubscriptionsPage() {
  const subscriptions = useQuery(api.subscriptions.list) || [];
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'cancelled' | 'trial'>('all');

  const filteredSubscriptions = subscriptions.filter((sub: any) => {
    if (activeTab === 'all') return true;
    return sub.status === activeTab;
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter((s: any) => s.status === 'active').length,
    trial: subscriptions.filter((s: any) => s.status === 'trial').length,
    cancelled: subscriptions.filter((s: any) => s.status === 'cancelled').length,
    mrr: subscriptions
      .filter((s: any) => s.status === 'active')
      .reduce((sum: number, s: any) => {
        const prices: Record<string, number> = { free: 0, basic: 9, pro: 29, premium: 99 };
        return sum + (prices[s.plan] || 0);
      }, 0)
  };

  const tabs = [
    { id: 'all', label: 'Todas', count: stats.total },
    { id: 'active', label: 'Activas', count: stats.active },
    { id: 'trial', label: 'Prueba', count: stats.trial },
    { id: 'cancelled', label: 'Canceladas', count: stats.cancelled },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Suscripciones
        </h1>
        <p className="text-gray-400 mt-1">
          Gestiona todas las suscripciones y planes de JoxAI
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">MRR Total</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">${stats.mrr.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Suscripciones Activas</p>
              <p className="text-3xl font-bold text-green-400 mt-1">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">En Prueba</p>
              <p className="text-3xl font-bold text-purple-400 mt-1">{stats.trial}</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/20 border border-cyan-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Suscripciones</p>
              <p className="text-3xl font-bold text-cyan-400 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        {tabs.map((tab: any) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700">
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            )}
          </button>
        ))}
      </div>

      {/* Subscriptions Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Usuario</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Plan</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Inicio</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Próximo Pago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No hay suscripciones en esta categoría
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((sub: any) => (
                  <tr key={sub._id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 font-medium">{sub.userId}</td>
                    <td className="px-6 py-4 text-blue-400">{sub.productId}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sub.plan === 'premium' 
                          ? 'bg-purple-900/50 text-purple-300 border border-purple-700'
                          : sub.plan === 'pro'
                          ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 ${
                        sub.status === 'active' ? 'text-green-400' : 
                        sub.status === 'trial' ? 'text-blue-400' : 'text-red-400'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {format(sub.startDate, 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {sub.nextBillingDate ? format(sub.nextBillingDate, 'dd/MM/yyyy') : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
