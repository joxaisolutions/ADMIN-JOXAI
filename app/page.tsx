'use client';

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useState } from 'react';
import { 
  LayoutDashboard, Users, CreditCard, DollarSign, 
  Coins, Package, HeadphonesIcon, TrendingUp, 
  Boxes, Settings, Menu, X, Bell, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UsersTable from '@/components/users-table';
import SubscriptionsPage from '@/components/subscriptions-page';
import FinancesPage from '@/components/finances-page';
import SupportPage from '@/components/support-page';

export default function DashboardPage() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const users = useQuery(api.users.list) || [];
  const subscriptions = useQuery(api.subscriptions.list) || [];
  const transactions = useQuery(api.transactions.list) || [];
  const tickets = useQuery(api.tickets.list) || [];
  // const metrics = useQuery(api.metrics.list) || []; // Uncomment after running: npx convex dev

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'subscriptions', label: 'Suscripciones', icon: CreditCard },
    { id: 'finances', label: 'Finanzas', icon: DollarSign },
    { id: 'tokens', label: 'Tokens & Uso', icon: Coins },
    { id: 'bundles', label: 'Bundles', icon: Package },
    { id: 'support', label: 'Soporte', icon: HeadphonesIcon },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'products', label: 'Productos', icon: Boxes },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  // Calculate metrics
  const totalUsers = users?.length || 0;
  const activeSubscriptions = subscriptions?.filter((s: any) => s.status === 'active').length || 0;
  const totalMRR = subscriptions?.filter((s: any) => s.status === 'active')
    .reduce((sum: number, s: any) => sum + s.price, 0) || 0;
  const openTickets = tickets?.filter((t: any) => t.status === 'open').length || 0;

  return (
    <div className="min-h-screen">
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-[#1a1f3a] to-background">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">J</span>
              </div>
              <CardTitle className="text-2xl">JoxAI Admin Dashboard</CardTitle>
              <CardDescription>
                Inicia sesión para acceder al panel administrativo
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full">
                  Iniciar Sesión
                </Button>
              </SignInButton>
            </CardContent>
          </Card>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex h-screen bg-gradient-to-br from-background via-[#1a1f3a] to-background text-foreground">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? 'w-64' : 'w-0'
            } transition-all duration-300 bg-card border-r border-border overflow-hidden`}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-xl font-bold">J</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">JoxAI</h1>
                  <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        currentPage === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-3 px-4 py-2">
                  <UserButton />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user?.fullName || 'Admin'}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-foreground font-medium">
                    {navigationItems.find((item) => item.id === currentPage)?.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Search size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {openTickets > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {openTickets}
                    </Badge>
                  )}
                </Button>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-auto p-6">
              {currentPage === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold">Overview</h2>
                    <p className="text-muted-foreground">Métricas generales del ecosistema JoxAI</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">MRR</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${totalMRR.toLocaleString()}
                        </div>
                        <p className="text-xs text-success">
                          +18% desde el mes pasado
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                        <p className="text-xs text-success">
                          +22% desde el mes pasado
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Suscripciones</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {activeSubscriptions.toLocaleString()}
                        </div>
                        <p className="text-xs text-success">
                          +15% desde el mes pasado
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
                        <HeadphonesIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{openTickets}</div>
                        <p className="text-xs text-muted-foreground">
                          Requieren atención
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Últimas Transacciones</CardTitle>
                        <CardDescription>Actividad reciente en la plataforma</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {transactions && transactions.length > 0 ? (
                          <div className="space-y-4">
                            {transactions.slice(0, 5).map((transaction: any, idx: number) => (
                              <div key={idx} className="flex items-start gap-4">
                                <div className={`w-2 h-2 mt-2 rounded-full ${
                                  transaction.status === 'success' ? 'bg-success' :
                                  transaction.status === 'failed' ? 'bg-destructive' :
                                  'bg-warning'
                                }`}></div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">
                                    ${transaction.amount} - {transaction.productId}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {transaction.status} - {transaction.method}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No hay transacciones recientes
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Tickets de Soporte</CardTitle>
                        <CardDescription>Últimos tickets abiertos</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {tickets && tickets.length > 0 ? (
                          <div className="space-y-4">
                            {tickets.filter((t: any) => t.status === 'open').slice(0, 5).map((ticket: any, idx: number) => (
                              <div key={idx} className="flex items-start gap-4">
                                <div className={`w-2 h-2 mt-2 rounded-full ${
                                  ticket.priority === 'high' ? 'bg-destructive' :
                                  ticket.priority === 'medium' ? 'bg-warning' :
                                  'bg-primary'
                                }`}></div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{ticket.subject}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {ticket.productId} - Prioridad {ticket.priority}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No hay tickets abiertos
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {currentPage === 'users' && <UsersTable />}
              {currentPage === 'subscriptions' && <SubscriptionsPage />}
              {currentPage === 'finances' && <FinancesPage />}
              {currentPage === 'support' && <SupportPage />}
              
              {!['overview', 'users', 'subscriptions', 'finances', 'support'].includes(currentPage) && (
                <div className="flex items-center justify-center h-full">
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>
                        {navigationItems.find((item) => item.id === currentPage)?.label}
                      </CardTitle>
                      <CardDescription>
                        Página en construcción
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Esta sección estará disponible próximamente.
                      </p>
                      <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                        <p className="text-sm font-medium text-warning mb-2">
                          ⚠️ Configuración Pendiente
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Para activar completamente Convex, ejecuta:
                        </p>
                        <code className="block mt-2 p-2 bg-background rounded text-xs">
                          npx convex dev
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </main>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
