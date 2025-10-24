'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function SupportPage() {
  const tickets = useQuery(api.tickets.list) || [];
  const updateTicketStatus = useMutation(api.tickets.updateStatus);
  
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter((ticket: any) => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter((t: any) => t.status === 'open').length,
    inProgress: tickets.filter((t: any) => t.status === 'in_progress').length,
    resolved: tickets.filter((t: any) => t.status === 'resolved').length,
    avgResponseTime: '2.5h',
  };

  const handleStatusUpdate = async (ticketId: string, newStatus: string) => {
    await updateTicketStatus({ id: ticketId, status: newStatus });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'low': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Soporte
        </h1>
        <p className="text-gray-400 mt-1">
          Gestiona tickets de soporte y consultas de usuarios
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Tickets</p>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Abiertos</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{stats.open}</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
          <p className="text-gray-400 text-sm">En Progreso</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.inProgress}</p>
        </div>
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Resueltos</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{stats.resolved}</p>
        </div>
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Tiempo Promedio</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{stats.avgResponseTime}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos los estados</option>
          <option value="open">Abiertos</option>
          <option value="in_progress">En Progreso</option>
          <option value="resolved">Resueltos</option>
          <option value="closed">Cerrados</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas las prioridades</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No hay tickets que coincidan con los filtros</p>
          </div>
        ) : (
          filteredTickets.map((ticket: any) => (
            <div key={ticket._id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(ticket.status)}
                    <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{ticket.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Usuario: <span className="text-blue-400">{ticket.userId}</span></span>
                    <span>Producto: <span className="text-purple-400">{ticket.productId}</span></span>
                    <span>Creado: {format(ticket._creationTime, 'dd/MM/yyyy HH:mm')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusUpdate(ticket._id, e.target.value)}
                    className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="open">Abierto</option>
                    <option value="in_progress">En Progreso</option>
                    <option value="resolved">Resuelto</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
