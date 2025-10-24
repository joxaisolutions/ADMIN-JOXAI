# JoxAI Admin Dashboard

## Descripción del Proyecto

Dashboard administrativo completo para gestionar todo el ecosistema JoxAI, una empresa de soluciones de IA que incluye 7 productos:
- AUTOCREA (generación de código)
- EDUGENIUS (educación)
- MEDIX AI (salud)
- ECOTRACK AI (sostenibilidad)
- HIREWISE (RRHH)
- FINWISDOM (finanzas)
- MINDFUL AI (bienestar mental)

## Stack Tecnológico

- **Frontend**: Next.js 14 con App Router + TypeScript
- **Autenticación**: Clerk (configurado con variables de entorno de producción)
- **Base de Datos**: Convex (configurado con deployment de producción)
- **Estilos**: Tailwind CSS v4 con tema personalizado JoxAI
- **Componentes UI**: shadcn/ui + Radix UI
- **Iconos**: Lucide React
- **Gráficos**: Recharts (pendiente de implementar)
- **Formularios**: React Hook Form + Zod

## Estado Actual

### ✅ Completado

1. **Configuración Base**
   - Next.js 14 con TypeScript
   - Tailwind CSS v4 configurado con paleta de colores JoxAI
   - Todos los componentes shadcn/ui necesarios

2. **Autenticación con Clerk**
   - Integración completa con Clerk
   - Protección de rutas con middleware
   - Login/logout funcional
   - UserButton integrado

3. **Base de Datos Convex**
   - Schema completo definido (users, subscriptions, transactions, tickets, bundles, metrics)
   - Queries y mutations para todas las entidades
   - Integración con Clerk para sincronización de usuarios

4. **Dashboard Layout**
   - Sidebar responsive con navegación
   - Header con breadcrumbs, búsqueda y notificaciones
   - Tema dark mode con gradientes JoxAI

5. **Overview Page**
   - Métricas cards (MRR, Usuarios, Suscripciones, Tickets)
   - Actividad reciente de transacciones
   - Lista de tickets abiertos
   - Datos en tiempo real desde Convex

### 🚧 Pendiente de Completar

1. **Páginas Completas**
   - Users (tabla avanzada con CRUD completo)
   - Subscriptions (tabs y gestión)
   - Finances (transacciones e invoices)
   - Tokens & Usage (tracking y alertas)
   - Support (sistema de mensajería)
   - Bundles, Analytics, Products, Settings

2. **Visualizaciones**
   - Gráficos interactivos con Recharts
   - Charts de MRR growth
   - Distribution charts
   - Analytics dashboards

3. **Features Adicionales**
   - Sistema de toasts/notifications
   - Modales de confirmación
   - Formularios con validación
   - Exportación de datos a CSV

## Configuración Requerida

### Paso 1: Deploy del Schema de Convex

El schema de Convex está definido pero necesita ser desplegado. Ejecuta:

```bash
npx convex deploy
```

Esto subirá todas las tablas y funciones a tu deployment de producción de Convex.

### Paso 2: Variables de Entorno

Todas las variables ya están configuradas en Replit Secrets:
- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Arquitectura del Proyecto

```
/app
  ├── layout.tsx        # Layout principal con Providers
  ├── page.tsx          # Dashboard principal con Overview
  ├── providers.tsx     # Clerk + Convex providers
  └── globals.css       # Estilos globales y tema

/components
  └── ui/               # Componentes shadcn/ui
      ├── button.tsx
      ├── card.tsx
      ├── badge.tsx
      ├── table.tsx
      ├── dialog.tsx
      ├── tabs.tsx
      ├── select.tsx
      └── dropdown-menu.tsx

/convex
  ├── schema.ts         # Definición del schema
  ├── users.ts          # Queries y mutations de usuarios
  ├── subscriptions.ts  # Gestión de suscripciones
  ├── transactions.ts   # Historial de transacciones
  ├── tickets.ts        # Sistema de soporte
  └── metrics.ts        # Métricas del dashboard

/lib
  └── utils.ts          # Utilidades (cn, formatters)

middleware.ts           # Protección de rutas con Clerk
```

## Próximos Pasos

1. Ejecutar `npx convex deploy` para subir el schema
2. Implementar las páginas restantes del dashboard
3. Agregar gráficos interactivos con Recharts
4. Implementar sistema completo de CRUD para todas las entidades
5. Testing y optimización

## Notas Técnicas

- El proyecto usa Tailwind CSS v4 que requiere `@tailwindcss/postcss`
- El tema se define en CSS con custom properties en `app/globals.css`
- Clerk maneja toda la autenticación y sesiones
- Convex proporciona real-time data syncing automático
- El workflow está configurado para correr en puerto 5000 con host 0.0.0.0
