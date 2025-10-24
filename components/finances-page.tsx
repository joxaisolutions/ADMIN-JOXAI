'use client';

import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Download } from 'lucide-react';
import { format } from 'date-fns';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function FinancesPage() {
  const transactions = useQuery(api.transactions.list) || [];
  
  const totalRevenue = transactions
    .filter((t: any) => t.type === 'subscription' || t.type === 'token_purchase')
    .reduce((sum: number, t: any) => sum + t.amount, 0);
  
  const monthlyRevenue = transactions
    .filter((t: any) => {
      const date = new Date(t._creationTime);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const refunds = transactions.filter((t: any) => t.type === 'refund').reduce((sum: number, t: any) => sum + t.amount, 0);
  const pendingPayments = transactions.filter((t: any) => t.status === 'pending').reduce((sum: number, t: any) => sum + t.amount, 0);

  // Chart data
  const last30Days = Array.from({ length: 30 }, (_: any, i: number) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dayTransactions = transactions.filter((t: any) => {
      const tDate = new Date(t._creationTime);
      return tDate.toDateString() === date.toDateString();
    });
    return {
      date: format(date, 'dd/MM'),
      revenue: dayTransactions.reduce((sum: number, t: any) => sum + (t.type !== 'refund' ? t.amount : 0), 0),
      refunds: Math.abs(dayTransactions.reduce((sum: number, t: any) => sum + (t.type === 'refund' ? t.amount : 0), 0))
    };
  });

  const revenueByProduct = Object.entries(
    transactions.reduce((acc: any, t: any) => {
      if (t.type !== 'refund') {
        acc[t.productId] = (acc[t.productId] || 0) + t.amount;
      }
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]: [string, any]) => ({ name, value }));

  const COLORS = ['#4A90E2', '#9B59B6', '#00D9FF', '#3498DB', '#E74C3C', '#F39C12', '#2ECC71'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Finanzas
          </h1>
          <p className="text-gray-400 mt-1">
            Gestión financiera y transacciones de JoxAI
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Exportar Reporte
        </button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ingresos Totales</p>
              <p className="text-3xl font-bold text-green-400 mt-1">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span>+15.2% este mes</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Mes Actual</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">${monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Reembolsos</p>
              <p className="text-3xl font-bold text-red-400 mt-1">${Math.abs(refunds).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border border-yellow-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendientes</p>
              <p className="text-3xl font-bold text-yellow-400 mt-1">${pendingPayments.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Ingresos Últimos 30 Días</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={last30Days}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#4A90E2" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Product */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Ingresos por Producto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueByProduct}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByProduct.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Transacciones Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Usuario</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Monto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {transactions.slice(0, 10).map((tx: any) => (
                <tr key={tx._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-gray-400">{tx._id.slice(-8)}</td>
                  <td className="px-6 py-4">{tx.userId}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm capitalize">{tx.type.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={tx.amount < 0 ? 'text-red-400' : 'text-green-400'}>
                      ${Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === 'completed' 
                        ? 'bg-green-900/50 text-green-300 border border-green-700'
                        : tx.status === 'pending'
                        ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                        : 'bg-red-900/50 text-red-300 border border-red-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {format(tx._creationTime, 'dd/MM/yyyy HH:mm')}
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
