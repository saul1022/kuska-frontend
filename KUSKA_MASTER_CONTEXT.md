# KUSKA — Contexto Maestro del Proyecto para Presentación / Pitch Deck (PPT)

> **Propósito de este documento:** Servir de contexto completo para que cualquier IA (como Claude) genere las diapositivas de la presentación en PowerPoint (PPT) o guion para el pitch de 5 minutos en la Hackathon "Build with Gemma" — GDG Callao.

---

## 📌 1. Ficha Técnica del Proyecto

* **Nombre del Proyecto:** Kuska ("Juntos" en Quechua)
* **Evento:** Hackathon *"Build with Gemma"* — GDG Callao (25 de Julio de 2026)
* **Track Principal ODS:** **ODS 11 — Ciudades y Comunidades Sostenibles** *(Meta 11.b: Resiliencia urbana ante desastres y gestión del riesgo)*.
* **Modelo de IA Utilizado:** **Gemma 4 Multimodal** (vía Google AI Studio / Gemini API)
* **Live Demo del Dashboard Web:** [https://kuska-dashboard.vercel.app](https://kuska-dashboard.vercel.app)
* **Repositorio de Código Público:** [https://github.com/saul1022/kuska-frontend](https://github.com/saul1022/kuska-frontend)

---

## 🔴 2. El Problema Real y Contexto Histórico (El Hook del Pitch)

Kuska nace de la necesidad humana crítica observada en dos tragedias sísmicas reales:

### 1. El Sismo de Junín (Perú — 18 de Julio):
* Casas destruidas en segundos, familias que lo perdieron todo y 6 personas fallecidas que no pudieron ser auxiliadas a tiempo.
* **El colapso de la comunicación:** La gente intentaba pedir ayuda pero las redes celulares colapsaron. Mensajes desesperados en WhatsApp, fotos en Facebook y audios dispersos sin que nadie pudiera confirmar las ubicaciones exactas.

### 2. La Tragedia en Venezuela:
* Dos terremotos consecutivos devastadores. Edificios enteros derrumbados y familias removiendo escombros con sus propias manos llamando por su nombre a quienes seguían atrapados.
* **El cuello de botella:** Las personas sabían aproximadamente dónde estaban sus familiares, pero la información correcta no lograba llegar a los rescatistas en el momento indicado.

### La Pregunta Central del Proyecto:
> **"¿Cuántas vidas podrían salvarse si, después de un terremoto, pudiéramos entender más rápido dónde está el verdadero peligro y quién necesita ayuda primero?"**

---

## 💡 3. La Solución Kuska (Visión General)

Kuska convierte la evidencia ciudadana dispersa y registrada sin conexión a internet en información **estructurada, georreferenciada y priorizada por Inteligencia Artificial**, entregando a los centros de control un panorama claro para la toma de decisiones humanas.

### Los 3 Pilares del Sistema:

```text
1. 📱 APP MÓVIL (Ciudadano en la calle — Offline-First)
   - React Native + Expo + SQLite.
   - Captura fotos, coordenadas GPS y relato escrito en Modo Avión (sin internet).
   - Guarda los reportes localmente y se sincroniza automáticamente en lote cuando vuelve la red.

2. ⚙️ BACKEND & IA GEMMA 4 (Motor de Clasificación y Priorización)
   - Python 3.11 + FastAPI + Supabase.
   - Pasa la evidencia multimodal (foto + texto) a Gemma 4 en una sola llamada de inferencia.
   - Devuelve un JSON estricto con nivel de daño, gravedad, riesgos secundarios y explicación en lenguaje natural.

3. 🖥️ DASHBOARD WEB (Centro de Control de Emergencias — Operadores)
   - Next.js 16 + TypeScript + Leaflet (Desplegado en Vercel).
   - Mapa interactivo con pines de colores por prioridad (🔴 Alta, 🟡 Media, 🟢 Baja).
   - Modal de inspección detallada con el razonamiento explicable de la IA y botones de validación humana.
```

---

## 🧠 4. Integración de Gemma 4 e IA Responsable

### Salida JSON Estricta de Gemma 4:
```json
{
  "type": "colapso_estructural | via_bloqueada | incendio | grietas | servicio_interrumpido",
  "damage_level": "leve | moderado | severo | critico",
  "trapped_people_possible": true,
  "secondary_risks": ["cables_electricos", "fuego_propaga", "desprendimiento_rocas"],
  "priority": "alta | media | baja",
  "explanation": "Gemma 4 detectó colapso de muros de mampostería con cables de alta tensión caídos, indicando peligro inminente para la vida."
}
```

### Reglas de Seguridad en IA:
* **Cero Alucinaciones de Víctimas:** Si la evidencia no permite confirmar personas atrapadas o heridos, Gemma 4 devuelve `null`. Nunca inventa números de víctimas.
* **IA Explicable (XAI):** El operador del centro de mando ve la justificación en español generada por la IA para saber *por qué* se le dio esa prioridad.
* **Validación Humana (Human-in-the-Loop):** Kuska apoya la decisión, pero el ser humano (bomberos/operadores) confirma y despacha los recursos.

---

## 🌍 5. Alineación Profunda con los Objetivos de Desarrollo Sostenible (ODS)

### **ODS 11: Ciudades y Comunidades Sostenibles (Enfoque Principal)**
* **Meta 11.b:** "Aumentar considerablemente el número de ciudades y asentamientos humanos que adoptan e implementan políticas para la mitigación del cambio climático y la resiliencia ante los desastres."
* **Contribución de Kuska:** Reduce drásticamente el tiempo de respuesta urbana post-desastre en ciudades vulnerables de América Latina, protegiendo asentamientos informales e infraestructura comunitaria mediante tecnología resiliente que funciona sin red eléctrica o telefónica inmediata.

---

## 📋 6. Estructura Sugerida para el PPT de 5 Minutos (5 Diapositivas)

1. **Diapositiva 1: Portada e Impacto**
   - *Kuska: Juntos cuando cada segundo cuenta.*
   - "Conectando el reporte ciudadano offline con los centros de control mediante Gemma 4."
2. **Diapositiva 2: El Problema (Junín & Venezuela)**
   - El caos de datos, la caída de redes móviles y las familias buscando en escombros.
   - La pregunta: ¿Cuántas vidas se habrían salvado recibiendo la información a tiempo?
3. **Diapositiva 3: La Solución Kuska (Offline-First)**
   - App Móvil registrando en Modo Avión ➔ Sincronización automática ➔ Backend.
4. **Diapositiva 4: Gemma 4 Multimodal + Dashboard de Emergencias**
   - Demostración visual del Mapa con pines por prioridad (🔴 Alta, 🟡 Media, 🟢 Baja).
   - Tarjeta de análisis explicable de Gemma 4 y validación humana.
5. **Diapositiva 5: ODS 11 e Impacto Social**
   - Resiliencia comunitaria y compromiso social.
   - Cierre: "Una fotografía convertida en alerta, una alerta convertida en respuesta, y una respuesta a tiempo convertida en una vida salvada."
