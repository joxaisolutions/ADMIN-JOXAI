# 🚀 Guía de Despliegue en Netlify - Dashboard JoxAI

## ✅ Tu Aplicación Está Lista para Desplegar

Todos los archivos de configuración están listos. Solo sigue los pasos a continuación.

---

## 📋 Paso 1: Configuración en Netlify Dashboard

### A. Build Settings (Site settings → Build & deploy → Build settings)

**Copia estos valores EXACTAMENTE:**

```
Base directory:         (DEJAR VACÍO - no escribas nada)
Build command:          npm run build
Publish directory:      .next
Functions directory:    (DEJAR VACÍO - ya está en netlify.toml)
```

**⚠️ IMPORTANTE:** 
- NO pongas "out" en Publish directory
- NO agregues redirects manuales
- Publish directory debe ser `.next` (con el punto)

#### B. Variables de Entorno (Site settings → Environment variables)

Agrega estas 4 variables con tus valores reales:

1. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**
   - Valor: Tu clave pública de Clerk (empieza con `pk_`)
   - Obténla en: https://dashboard.clerk.com

2. **CLERK_SECRET_KEY**
   - Valor: Tu clave secreta de Clerk (empieza con `sk_`)
   - Obténla en: https://dashboard.clerk.com

3. **NEXT_PUBLIC_CONVEX_URL**
   - Valor: Tu URL de Convex (formato: `https://xxx.convex.cloud`)
   - Obténla en: https://dashboard.convex.dev

4. **CONVEX_DEPLOYMENT**
   - Valor: Tu deployment ID de Convex
   - Obténla en: https://dashboard.convex.dev

---

### 🔐 Paso 2: Configurar Clerk para Netlify

1. Ve a https://dashboard.clerk.com
2. Selecciona tu aplicación
3. Ve a **Configure → Domains**
4. Agrega tu dominio de Netlify:
   ```
   https://tu-sitio.netlify.app
   ```
5. Si usas dominio personalizado, agrégalo también:
   ```
   https://tudominio.com
   ```
6. Guarda los cambios

---

### 🗄️ Paso 3: Ejecutar Convex Deploy

Antes de desplegar en Netlify, debes sincronizar tu schema de Convex:

```bash
# Instala Convex CLI si no lo tienes
npm install -g convex

# Genera tipos y despliega schema
npx convex dev
```

Espera a que termine y verás:
```
✓ Convex functions ready!
✓ Watching for file changes...
```

Puedes cerrar el proceso (Ctrl+C) después de que se complete.

---

### 📦 Paso 4: Desplegar en Netlify

#### Opción A: Desde Git (Recomendado)

1. Sube tu código a GitHub/GitLab/Bitbucket
2. En Netlify: **Add new site → Import an existing project**
3. Conecta tu repositorio
4. Netlify detectará automáticamente la configuración de `netlify.toml`
5. Click en **Deploy site**

#### Opción B: Netlify CLI

```bash
# Instala Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Inicializa el sitio
netlify init

# Deploy
netlify deploy --build --prod
```

---

### ✅ Paso 5: Verificación Post-Deploy

Después del despliegue, verifica:

1. **✅ La página carga correctamente**
   - Visita tu URL de Netlify

2. **✅ Clerk funciona**
   - Intenta hacer login/signup
   - Si hay error de dominio, revisa el Paso 2

3. **✅ Convex conecta**
   - Verifica que el dashboard muestra datos
   - Si no conecta, revisa las variables de entorno

4. **✅ Las páginas funcionan**
   - Prueba Usuarios, Suscripciones, Finanzas, Soporte

---

### 🐛 Solución de Problemas

#### Error: "Clerk: Invalid domain"

**Solución:**
- Ve a Clerk Dashboard → Configure → Domains
- Agrega tu dominio de Netlify exacto (con https://)
- Espera 1-2 minutos para que se propague

#### Error: "Convex connection failed"

**Solución:**
- Verifica que `NEXT_PUBLIC_CONVEX_URL` esté configurado
- Asegúrate de haber ejecutado `npx convex dev`
- Revisa que el valor empiece con `https://`

#### Error: "Build failed"

**Solución:**
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build en Netlify
- Asegúrate de que `netlify.toml` esté en la raíz del proyecto

#### Página en blanco o 404

**Solución:**
- Verifica que Publish directory sea `.next` (no `out`)
- Confirma que el build command sea `npm run build`
- Revisa los logs de función en Netlify

---

### 📊 Archivos Configurados

Tu proyecto ya tiene estos archivos listos para Netlify:

- ✅ `netlify.toml` - Configuración de build y deploy
- ✅ `middleware.ts` - Autenticación con Clerk
- ✅ `next.config.ts` - Optimizado para producción
- ✅ `.env.local.example` - Plantilla de variables de entorno

---

### 🎯 Checklist Final Antes de Deploy

- [ ] Variables de entorno configuradas en Netlify (4 variables)
- [ ] Dominio agregado en Clerk Dashboard
- [ ] `npx convex dev` ejecutado al menos una vez
- [ ] Código subido a Git (si usas Git deploy)
- [ ] Plugin `@netlify/plugin-nextjs` instalado (✅ ya está)
- [ ] Archivo `netlify.toml` en la raíz (✅ ya está)

---

### 🚀 Deploy Continuo

Si conectaste Git a Netlify:
- Cada push a la rama principal → Deploy automático
- Pull requests → Preview deploys automáticos
- Rollback fácil desde Netlify Dashboard

---

### 💡 Tips de Optimización

1. **Caché de Build:**
   - Netlify cachea `node_modules` automáticamente
   - Los builds subsecuentes serán más rápidos

2. **Preview Deploys:**
   - Usa branches para features
   - Netlify crea URLs de preview automáticamente

3. **Dominios Personalizados:**
   - Site settings → Domain management
   - Agrega tu dominio y configura DNS

4. **Analytics:**
   - Habilita Netlify Analytics para ver tráfico
   - Gratuito en planes pagados

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs de build en Netlify
2. Verifica los logs de función en tiempo real
3. Consulta: https://docs.netlify.com/frameworks/next-js/
4. Contacta soporte de Netlify si el problema persiste

---

**¡Tu dashboard está listo para producción en Netlify! 🎉**
