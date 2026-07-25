# Kuska Dashboard

Dashboard web de incidentes post-sismo construido con Next.js y Leaflet. Consume los reportes
registrados por la aplicación móvil a través de Kuska API y actualiza la vista cada 15 segundos.

## Desarrollo local

Crear `.env.local` a partir de `.env.example`:

```env
KUSKA_API_URL=http://127.0.0.1:8000
```

Luego ejecutar:

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

FastAPI debe estar desplegado en una URL HTTPS pública. Configurar en Vercel la variable de
entorno servidor `KUSKA_API_URL` sin el prefijo `NEXT_PUBLIC_`:

```env
KUSKA_API_URL=https://api-kuska.example.com
```

El navegador consulta `/api/incidents` en el propio dashboard. Next.js actúa como proxy hacia
FastAPI, por lo que no se exponen direcciones privadas ni credenciales al cliente.
