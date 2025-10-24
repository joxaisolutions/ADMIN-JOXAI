# Configuración de Clerk para Replit

## Problema Actual

El error "accounts.administrator.joxai.org rechazó la conexión" ocurre porque Clerk está configurado para usar el dominio `administrator.joxai.org`, pero estás accediendo desde el dominio de Replit.

## Solución

Necesitas agregar el dominio de Replit a tu configuración de Clerk:

### Paso 1: Accede al Dashboard de Clerk

1. Ve a https://dashboard.clerk.com
2. Selecciona tu aplicación

### Paso 2: Configura los Dominios Permitidos

1. En el menú lateral, ve a **"Domains"** o **"Settings"**
2. Busca la sección de **"Allowed origins"** o **"Authorized domains"**
3. Agrega los siguientes dominios:

```
https://*.replit.dev
https://*.repl.co
http://localhost:5000
```

### Paso 3: Configura las URLs de Redirección

En la sección de **"Paths"**, asegúrate de que las siguientes rutas estén configuradas:

- **Sign-in URL**: `/`
- **Sign-up URL**: `/`  
- **After sign-in URL**: `/`
- **After sign-up URL**: `/`

### Paso 4: Verifica la Configuración de la Aplicación

En **Settings → General**, verifica que:

- **Development instance** esté activado si estás en desarrollo
- O si estás en producción, asegúrate de tener el dominio correcto configurado

## Alternativa: Usar Dominio Personalizado

Si prefieres usar `administrator.joxai.org`:

1. Configura el dominio personalizado en Replit
2. Apunta el DNS de `administrator.joxai.org` a tu Repl
3. Actualiza la configuración de Clerk para usar ese dominio

## Verificar que Funciona

Después de hacer estos cambios:

1. Espera 1-2 minutos para que los cambios se propaguen
2. Recarga la página de tu dashboard en Replit
3. El login de Clerk debería funcionar correctamente

## Información Adicional

Tu aplicación de Clerk está actualmente configurada con:
- Publishable Key: `pk_live_...` (dominio: administrator.joxai.org)
- Secret Key: Configurado correctamente en Replit Secrets

El dashboard está listo y funcionando, solo necesita esta configuración de dominios en Clerk para que la autenticación funcione.
