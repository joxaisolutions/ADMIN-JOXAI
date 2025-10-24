# JoxAI Admin Dashboard

## Descripción General

Dashboard administrativo completo para el ecosistema JoxAI que gestiona 7 productos AI (AUTOCREA, EDUGENIUS, MEDIX AI, ECOTRACK AI, HIREWISE, FINWISDOM, MINDFUL AI). Construido con Next.js 14+, TypeScript, TailwindCSS v4, shadcn/ui, Convex (base de datos en producción) y Clerk (autenticación en producción).

## Estado Actual del Proyecto

### ✅ Completado

1. **Infraestructura Base**
   - Next.js 14 con TypeScript
   - TailwindCSS v4 configurado con tema JoxAI personalizado
   - shadcn/ui con todos los componentes necesarios
   - Clerk integrado para autenticación (producción)
   - Convex configurado para base de datos (producción)
   - Workflow de desarrollo en puerto 5000

2. **Base de Datos Convex**
   - Schema completo definido: users, subscriptions, transactions, tickets, metrics, bundles
   - Queries implementadas para todas las entidades
   - Mutations CRUD completas

3. **Páginas Implementadas**
   - ✅ Overview: Dashboard principal con métricas en tiempo real
   - ✅ Usuarios: Tabla completa con filtros, búsqueda, exportar CSV, CRUD
   - ✅ Suscripciones: Gestión de suscripciones con tabs y estadísticas MRR
   - ✅ Finanzas: Transacciones, gráficos de ingresos, análisis por producto
   - ✅ Soporte: Sistema de tickets con prioridades y estados
   - ⏳ Tokens & Uso: Pendiente
   - ⏳ Bundles: Pendiente
   - ⏳ Analytics: Pendiente
   - ⏳ Productos: Pendiente
   - ⏳ Configuración: Pendiente

4. **Características Implementadas**
   - Sistema de autenticación completo con Clerk
   - Navegación responsive con sidebar colapsable
   - Tema dark mode profesional
   - Filtros y búsqueda en tablas
   - Exportación de datos a CSV
   - Gráficos con Recharts (ingresos, productos, etc.)
   - Operaciones CRUD en tiempo real
   - Estadísticas y métricas en vivo

### ⚠️ Configuración Pendiente (Requiere Acción del Usuario)

#### 1. Configurar Dominios en Clerk

El dashboard usa Clerk en producción, pero necesita que agregues el dominio de Replit:

1. Ve a https://dashboard.clerk.com
2. Selecciona tu aplicación
3. Ve a **Settings → Domains** (o **Allowed origins**)
4. Agrega:
   ```
   https://*.replit.dev
   https://*.repl.co
   ```

Ver `CONFIGURACION_CLERK.md` para instrucciones detalladas.

#### 2. Ejecutar Convex Codegen

Para generar tipos TypeScript correctos y desplegar el schema:

```bash
npx convex dev
```

Esto:
- Genera tipos en `convex/_generated/`
- Despliega el schema a tu deployment de Convex
- Habilita las queries y mutations en producción

**Nota:** Por ahora se crearon archivos temporales en `convex/_generated/` para permitir compilación, pero los tipos reales se generarán con el comando anterior.

## Arquitectura

### Frontend
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** TailwindCSS v4 con tema personalizado
- **UI Components:** shadcn/ui (Radix UI)
- **Charts:** Recharts
- **Icons:** Lucide React

### Backend/Database
- **Database:** Convex (producción)
- **Authentication:** Clerk (producción)
- **Schema:** 6 tablas principales con relaciones

### Estructura de Archivos

```
├── app/
│   ├── layout.tsx          # Layout principal con ConvexProvider
│   └── page.tsx            # Dashboard con navegación y routing interno
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── users-table.tsx     # Página de usuarios con CRUD
│   ├── subscriptions-page.tsx  # Gestión de suscripciones
│   ├── finances-page.tsx   # Dashboard financiero
│   └── support-page.tsx    # Sistema de tickets
├── convex/
│   ├── schema.ts           # Schema de base de datos
│   ├── users.ts            # Queries/mutations de usuarios
│   ├── subscriptions.ts    # Queries/mutations de suscripciones
│   ├── transactions.ts     # Queries/mutations de transacciones
│   ├── tickets.ts          # Queries/mutations de tickets
│   └── metrics.ts          # Queries/mutations de métricas
└── middleware.ts           # Clerk authentication middleware
```

## Productos JoxAI en el Ecosistema

1. **AUTOCREA** - Generación de contenido automatizado
2. **EDUGENIUS** - Plataforma educativa AI
3. **MEDIX AI** - Asistente médico inteligente
4. **ECOTRACK AI** - Monitoreo ambiental
5. **HIREWISE** - Reclutamiento inteligente
6. **FINWISDOM** - Asesoría financiera AI
7. **MINDFUL AI** - Salud mental y bienestar

## Tema y Diseño

### Paleta de Colores
- **Azul Principal:** #4A90E2
- **Púrpura:** #9B59B6
- **Cyan:** #00D9FF
- **Gradientes:** Azul a Púrpura en títulos y botones
- **Dark Mode:** Fondo oscuro (#0a0a0a) con overlays sutiles

### Componentes UI
- Cards con borders sutiles y glass effect
- Botones con gradientes
- Tablas con hover states
- Badges con colores semánticos
- Charts con tema consistente

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Convex
npx convex dev          # Modo desarrollo con codegen
npx convex deploy       # Deploy a producción

# Build
npm run build
npm run start
```

## Variables de Entorno

Configuradas en Replit Secrets:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`

## Próximos Pasos

1. ✅ Completar configuración de Clerk (agregar dominios)
2. ✅ Ejecutar `npx convex dev` para codegen
3. ⏳ Implementar páginas restantes (Tokens, Bundles, Analytics, Productos, Settings)
4. ⏳ Agregar más gráficos y visualizaciones
5. ⏳ Implementar notificaciones en tiempo real
6. ⏳ Testing completo
7. ⏳ Deploy a producción

## Tecnologías Clave

- **Next.js 16.0.0** - Framework React
- **TypeScript** - Tipado estático
- **Convex** - Base de datos en tiempo real
- **Clerk** - Autenticación y gestión de usuarios
- **TailwindCSS v4** - Styling
- **Recharts** - Visualización de datos
- **shadcn/ui** - Componentes UI
- **Lucide React** - Iconos

## Notas de Desarrollo

- Servidor corre en puerto 5000 (no cambiar)
- Convex usa _generated para tipos (generados automáticamente)
- Dark mode por defecto
- Responsive design para mobile/tablet/desktop
- Sin datos mock - todo conectado a producción cuando Convex esté activo
