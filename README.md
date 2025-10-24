# JoxAI Admin Dashboard

Dashboard administrativo completo para gestionar el ecosistema JoxAI.

## Configuración de Producción

### Variables de Entorno Configuradas ✅

Las siguientes variables ya están configuradas en Replit Secrets:

- `NEXT_PUBLIC_CONVEX_URL` - URL del deployment de Convex
- `CONVEX_DEPLOYMENT` - ID del deployment de Convex
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clave pública de Clerk
- `CLERK_SECRET_KEY` - Clave secreta de Clerk

### Deployment del Schema de Convex

Para subir el schema de la base de datos a Convex, ejecuta el siguiente comando **una sola vez**:

```bash
npx convex deploy
```

Esto desplegará todas las tablas y queries definidas en la carpeta `/convex` a tu deployment de producción.

### Estructura de la Base de Datos

El schema incluye las siguientes tablas:

- **users** - Usuarios del ecosistema (sincronizados con Clerk)
- **subscriptions** - Suscripciones activas, canceladas, trial
- **transactions** - Historial de transacciones y pagos
- **tickets** - Sistema de soporte y tickets
- **bundles** - Paquetes de productos
- **metrics** - Métricas mensuales (MRR, usuarios, tokens)

## Desarrollo

```bash
npm run dev
```

El dashboard estará disponible en `http://localhost:5000`

## Características

- ✅ Autenticación con Clerk
- ✅ Base de datos real con Convex
- ✅ Dashboard responsive
- ✅ Métricas en tiempo real
- ✅ Gestión de usuarios
- ✅ Gestión de suscripciones
- ✅ Sistema de tickets de soporte
- ✅ Analytics y reportes

## Stack Tecnológico

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Auth**: Clerk
- **Database**: Convex
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
