export type Priority = 'alta' | 'media' | 'baja';

export type DamageLevel = 'leve' | 'moderado' | 'severo' | 'critico';

export type IncidentType =
  | 'colapso_estructural'
  | 'grietas'
  | 'incendio'
  | 'persona_atrapada'
  | 'via_bloqueada'
  | 'servicio_interrumpido'
  | 'otro';

export interface GemmaResult {
  type: IncidentType;
  damage_level: DamageLevel;
  trapped_people_possible: boolean;
  secondary_risks: string[];
  priority: Priority;
  explanation: string;
}

export interface Incident {
  id: string;
  client_id: string;
  description: string;
  lat: number;
  lon: number;
  address_reference?: string;
  photos: string[];
  video_url?: string;
  priority: Priority;
  type: IncidentType;
  status: 'processing' | 'needs_review' | 'validated';
  created_at: string;
  thumbnail_url: string;
  gemma_result?: GemmaResult;
}
