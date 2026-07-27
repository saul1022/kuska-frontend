import { Incident } from '../types/incident';

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'inc-001',
    client_id: 'cli-uuid-101',
    description: 'Derrumbe parcial de vivienda de adobe y quincha. Hay cables eléctricos expuestos sobre la vereda y el pasaje está bloqueado.',
    lat: -12.0543,
    lon: -77.0392,
    address_reference: 'Jr. Junín 450, Cercado de Lima',
    photos: [
      'https://images.unsplash.com/photo-1590059301980-0a2a4b8f526b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop'
    ],
    priority: 'alta',
    type: 'colapso_estructural',
    status: 'needs_review',
    created_at: new Date(Date.now() - 15 * 60000).toISOString(),
    thumbnail_url: 'https://images.unsplash.com/photo-1590059301980-0a2a4b8f526b?q=80&w=300&auto=format&fit=crop',
    gemma_result: {
      type: 'colapso_estructural',
      damage_level: 'severo',
      trapped_people_possible: true,
      secondary_risks: ['cables_electricos', 'riesgo_derrumbe_adicional'],
      priority: 'alta',
      explanation: 'Gemma 4 detectó pérdida del soporte de muro principal de adobe. Se observan cables caídos con potencial tensión viva y posible confinamiento en el interior.'
    }
  },
  {
    id: 'inc-002',
    client_id: 'cli-uuid-102',
    description: 'Desprendimiento de rocas e importante deslizamiento en la vía principal interurbana. Imposible el paso de vehículos de rescate.',
    lat: -11.1583,
    lon: -75.9928,
    address_reference: 'Carretera Central Km 128, Tarma, Junín',
    photos: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'
    ],
    priority: 'alta',
    type: 'via_bloqueada',
    status: 'needs_review',
    created_at: new Date(Date.now() - 35 * 60000).toISOString(),
    thumbnail_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=300&auto=format&fit=crop',
    gemma_result: {
      type: 'via_bloqueada',
      damage_level: 'critico',
      trapped_people_possible: false,
      secondary_risks: ['desprendimiento_continuo', 'incomunicacion_comunitaria'],
      priority: 'alta',
      explanation: 'Gemma 4 clasificó el evento como bloqueo total de arteria de transporte primaria. La masa de rocas impide el paso de ambulancias y brigadas.'
    }
  },
  {
    id: 'inc-003',
    client_id: 'cli-uuid-103',
    description: 'Grietas diagonales pronunciadas en columnas de colegio primario comunitario. Las clases fueron suspendidas inmediatamente.',
    lat: -12.0621,
    lon: -77.1482,
    address_reference: 'Av. Sáenz Peña 820, Bellavista, Callao',
    photos: [
      'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=800&auto=format&fit=crop'
    ],
    priority: 'media',
    type: 'grietas',
    status: 'needs_review',
    created_at: new Date(Date.now() - 55 * 60000).toISOString(),
    thumbnail_url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=300&auto=format&fit=crop',
    gemma_result: {
      type: 'grietas',
      damage_level: 'moderado',
      trapped_people_possible: false,
      secondary_risks: ['falla_estructural_futura'],
      priority: 'media',
      explanation: 'Gemma 4 identificó fisuras de cizallamiento a 45 grados en elementos de soporte. Se requiere inspección por ingenieros sin urgencia de rescate inminente.'
    }
  },
  {
    id: 'inc-004',
    client_id: 'cli-uuid-104',
    description: 'Ruptura de tubería de agua potable generando anegamiento de la calzada e interrupción del servicio en la manzana.',
    lat: -12.0432,
    lon: -77.0284,
    address_reference: 'Jr. Carabaya 912, Lima Centro',
    photos: [
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=800&auto=format&fit=crop'
    ],
    priority: 'baja',
    type: 'servicio_interrumpido',
    status: 'validated',
    created_at: new Date(Date.now() - 110 * 60000).toISOString(),
    thumbnail_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=300&auto=format&fit=crop',
    gemma_result: {
      type: 'servicio_interrumpido',
      damage_level: 'leve',
      trapped_people_possible: false,
      secondary_risks: ['desperdicio_agua', 'socavamiento_menor'],
      priority: 'baja',
      explanation: 'Gemma 4 clasifica el reporte como falla de servicio básico sin colapso de edificaciones ni vidas en peligro.'
    }
  },
  {
    id: 'inc-005',
    client_id: 'cli-uuid-105',
    description: 'Incendio puntual por cortocircuito provocado por la caída de un poste de luz secundario tras la sacudida.',
    lat: -11.9845,
    lon: -77.0623,
    address_reference: 'Av. Antunez de Mayolo 1420, Los Olivos, Lima',
    photos: [
      'https://images.unsplash.com/photo-1527018601619-a508a2be00df?q=80&w=800&auto=format&fit=crop'
    ],
    priority: 'alta',
    type: 'incendio',
    status: 'needs_review',
    created_at: new Date(Date.now() - 5 * 60000).toISOString(),
    thumbnail_url: 'https://images.unsplash.com/photo-1527018601619-a508a2be00df?q=80&w=300&auto=format&fit=crop',
    gemma_result: {
      type: 'incendio',
      damage_level: 'severo',
      trapped_people_possible: false,
      secondary_risks: ['fuego_propaga', 'chispa_electrica'],
      priority: 'alta',
      explanation: 'Gemma 4 detecta foco ígneo activo cerca de viviendas adyacentes. Prioridad alta por riesgo inminente de propagación.'
    }
  }
];
