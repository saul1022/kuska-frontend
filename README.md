# Kuska — Frontend (Hackathon "Build with Gemma" — GDG Callao)

> **Kuska** ("Juntos" en Quechua) es una plataforma de apoyo a la respuesta ante desastres sísmicos que utiliza la inteligencia artificial multimodal **Gemma 4** de Google para transformar reportes ciudadanos en información estructurada, georreferenciada y priorizada.

---

## 🎯 Proyecto: Dashboard Web (`kuska-dashboard`)

El **Dashboard Web de Kuska** es el centro de mando diseñado para que los operadores de emergencia y equipos de respuesta puedan visualizar e inspeccionar las alertas reportadas por los ciudadanos en tiempo real sobre un mapa georreferenciado.

### 🌟 Funcionalidades Principales Desarrolladas

1. **🗺️ Mapa Interactivo Georreferenciado (Leaflet + OpenStreetMap):**
   - Visualización de pines en coordenadas reales (Junín, Callao, Lima).
   - **Código de Colores por Prioridad:**
     - 🔴 **Alta / Crítica:** Rescate inminente, riesgo de colapso o incendio.
     - 🟡 **Media:** Daño estructural significativo o grietas de cizallamiento.
     - 🟢 **Baja:** Interrupción de servicio o daño leve sin riesgo vital.
   - Carga dinámica libre de errores SSR/hidratación en Next.js.

2. **🤖 Integración con Gemma 4 Multimodal (IA Explicable):**
   - Presentación destacada de la tarjeta **"Análisis de Gemma 4"** por cada incidente.
   - Extracción estructurada de:
     - Tipo de incidente (*Colapso estructural, Vía bloqueada, Incendio, Grietas, etc.*).
     - Nivel de severidad (*Leve, Moderado, Severo, Crítico*).
     - Alerta de posible confinamiento / personas atrapadas.
     - Riesgos secundarios (*Cables eléctricos caídos, Fuego, Deslizamientos*).
     - **Explicación en lenguaje natural del razonamiento de la IA.**

3. **📊 Lista Priorizada y Filtros Interactivos:**
   - Buscador por dirección, referencia o descripción.
   - Filtros rápidos por prioridad (Todas, Alta, Media, Baja).
   - Conexión bidireccional: al hacer click en una tarjeta de la lista, el mapa vuela suavemente hacia las coordenadas del incidente.

4. **✅ Flujo de Validación Humana:**
   - Botón de inspección para que el operador valide, corrija o confirme el incidente, manteniendo la regla de que la IA es una herramienta de apoyo y el humano toma las decisiones operativas finales.

5. **🌐 Alineación ODS 11 (Ciudades y Comunidades Sostenibles):**
   - Diseñado para aportar resiliencia urbana en comunidades expuestas a desastres sísmicos de alta vulnerabilidad.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Descripción |
|---|---|---|
| **Framework Web** | Next.js 16 (App Router) + React 19 | Renderizado híbrido optimizado y arquitectura de componentes |
| **Lenguaje** | TypeScript 5 | Tipado estricto para modelos de dominio e incidentes |
| **Estilos** | Vanilla CSS / Tailwind CSS v4 | Tema oscuro profesional (*Dark Slate & Glassmorphism*) |
| **Mapas** | Leaflet + React-Leaflet | Mapas interactivos sin depender de API Keys de pago |
| **Iconografía** | Lucide React | Iconos vectoriales para estados y prioridades |
| **Despliegue** | Vercel | Hosting cloud público sin autenticación para jurados |

---

## 📁 Estructura del Código

```text
kuska-frontend/
└── kuska-dashboard/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx               # Vista principal del Dashboard (Grid Mapa + Lista + Modal)
    │   │   ├── layout.tsx             # Layout global con fuentes y metadatos SEO
    │   │   └── globals.css            # Estilos globales y personalización de Leaflet
    │   ├── components/
    │   │   ├── Navbar.tsx             # Barra superior con badges de Gemma 4, ODS 11 y métricas
    │   │   ├── MapComponent.tsx       # Wrapper dinámico SSR-safe para Leaflet
    │   │   ├── MapComponentContent.tsx# Implementación interactiva del mapa y marcadores SVG
    │   │   ├── IncidentList.tsx       # Panel lateral de lista ordenada con buscador y filtros
    │   │   └── IncidentDetail.tsx     # Modal de detalle con evidencia y tarjeta de Gemma 4
    │   ├── data/
    │   │   └── mockIncidents.ts       # Datos de prueba georreferenciados post-sismo
    │   └── types/
    │       ├── incident.ts            # Interfaces de dominio (Incident, GemmaResult, Priority)
    │       └── declarations.d.ts      # Declaraciones de tipos para librerías de UI
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Guía de Ejecución Local

1. Entrar a la carpeta del dashboard:
   ```bash
   cd kuska-dashboard
   ```

2. Instalar dependencias (si aplica):
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   [http://localhost:3000](http://localhost:3000)

---

## 🌐 Despliegue en Producción (Vercel)

El proyecto está preparado para desplegarse instantáneamente en Vercel:

```bash
cd kuska-dashboard
npx vercel --prod
```

---

## 👥 Créditos — Rama `lucas`
* **Desarrollador Dashboard Web:** Lucas
* **Hackathon:** *Build with Gemma* — Google Developer Groups (GDG Callao) 2026