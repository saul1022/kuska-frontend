import { Incident } from '../types/incident';

type IncidentListResponse = Omit<Incident, 'photos' | 'thumbnail_url' | 'priority' | 'type'> & {
  photos?: string[];
  thumbnail_url: string | null;
  priority: Incident['priority'] | null;
  type: Incident['type'] | null;
};

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`API respondió ${response.status}: ${detail}`);
  }
  return response.json() as Promise<T>;
}

function normalizeIncident(incident: IncidentListResponse): Incident {
  return {
    ...incident,
    priority: incident.priority ?? 'baja',
    type: incident.type ?? 'otro',
    photos: incident.photos ?? [],
    thumbnail_url: incident.thumbnail_url ?? '',
  };
}

export async function listIncidents(): Promise<Incident[]> {
  const response = await fetch('/api/incidents', { cache: 'no-store' });
  const incidents = await parseResponse<IncidentListResponse[]>(response);
  return incidents.map(normalizeIncident);
}

export async function getIncident(incidentId: string): Promise<Incident> {
  const response = await fetch(`/api/incidents/${encodeURIComponent(incidentId)}`, {
    cache: 'no-store',
  });
  return normalizeIncident(await parseResponse<IncidentListResponse>(response));
}
