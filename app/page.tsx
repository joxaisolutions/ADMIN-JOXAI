'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, Users, CreditCard, DollarSign, 
  Coins, Package, HeadphonesIcon, TrendingUp, 
  Boxes, Settings, LogOut, Menu, X, Bell, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  return (
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <span className="text-sm font-bold">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@joxai.org</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-2 justify-start" size="sm">
              <LogOut size={16} className="mr-2" />
              Cerrar Sesión
            </Button>
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
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
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
                    <div className="text-2xl font-bold">$487,250</div>
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
                    <div className="text-2xl font-bold">125,340</div>
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
                    <div className="text-2xl font-bold">12,534</div>
                    <p className="text-xs text-success">
                      +15% desde el mes pasado
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.1%</div>
                    <p className="text-xs text-success">
                      -0.3% desde el mes pasado
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                    <CardDescription>Últimas acciones en la plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-success"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Nueva suscripción</p>
                          <p className="text-xs text-muted-foreground">
                            Juan Pérez se suscribió a AUTOCREA Pro
                          </p>
                          <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-warning"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pago fallido</p>
                          <p className="text-xs text-muted-foreground">
                            El pago de María García fue rechazado
                          </p>
                          <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Nuevo ticket</p>
                          <p className="text-xs text-muted-foreground">
                            Carlos López abrió un ticket de soporte
                          </p>
                          <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Alertas Críticas</CardTitle>
                    <CardDescription>Requieren atención inmediata</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive">
                        <p className="text-sm font-medium text-destructive">
                          Alto consumo de tokens detectado
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Usuario user_789 ha usado el 95% de sus tokens
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning">
                        <p className="text-sm font-medium text-warning">
                          Pagos próximos a fallar
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          15 tarjetas vencerán mañana
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentPage !== 'overview' && (
            <div className="flex items-center justify-center h-full">
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>
                    {navigationItems.find((item) => item.id === currentPage)?.label}
                  </CardTitle>
                  <CardDescription>
                    Esta sección está en desarrollo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    El contenido completo de esta página se está construyendo.
                    Por ahora, puedes navegar usando el menú lateral.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
