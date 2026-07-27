# Kuska Dashboard — Centro de Mando Web Post-Sismo

Dashboard de Next.js y Leaflet para visualizar los reportes creados desde Kuska Mobile. Consume
Kuska API, muestra la evaluación de Gemma y actualiza los incidentes cada 15 segundos.

## Funcionalidades

- Mapa georreferenciado con prioridad alta, media y baja.
- Lista, búsqueda y filtros de incidentes.
- Detalle de evidencia y análisis multimodal de Gemma.
- Sincronización automática con FastAPI.

## Desarrollo local

Crear `.env.local` a partir de `.env.example`:

```env
KUSKA_API_URL=http://127.0.0.1:8000
```

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

Configurar la variable servidor en Vercel:

```env
KUSKA_API_URL=https://kuska-lixb.onrender.com
```

Next.js utiliza `/api/incidents` como proxy hacia FastAPI, evitando exponer credenciales o
direcciones privadas en el navegador.
