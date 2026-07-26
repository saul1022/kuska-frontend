import { API_BASE_URL, MOCK_API } from './config';

/**
 * @typedef {Object} IncidentPayload
 * @property {string} clientId
 * @property {string} description
 * @property {number} lat
 * @property {number} lon
 * @property {string} createdAtClient - ISO 8601
 * @property {string[]} photoUris
 * @property {string=} videoUri
 * @property {string[]=} photoUrls
 * @property {string=} videoUrl
 */

function buildFormData(payload) {
  const form = new FormData();
  form.append('description', payload.description ?? '');
  form.append('lat', String(payload.lat));
  form.append('lon', String(payload.lon));
  form.append('client_id', payload.clientId);
  form.append('created_at_client', payload.createdAtClient);

  (payload.photoUris ?? []).forEach((uri, index) => {
    form.append('photos', {
      uri,
      name: `photo_${index}.jpg`,
      type: 'image/jpeg',
    });
  });

  if (payload.videoUri) {
    form.append('video', {
      uri: payload.videoUri,
      name: 'video.mp4',
      type: 'video/mp4',
    });
  }

  return form;
}

/**
 * POST /incidents
 * @param {IncidentPayload} payload
 * @returns {Promise<{ incident_id: string, status: string }>}
 */
export async function createIncident(payload) {
  if (MOCK_API) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { incident_id: `mock-${payload.clientId}`, status: 'processing' };
  }

  const response = await fetch(`${API_BASE_URL}/incidents`, {
    method: 'POST',
    body: buildFormData(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`POST /incidents falló con status ${response.status}: ${detail}`);
  }

  return response.json();
}

/** GET /incidents/{incident_id}: incluye el resultado de Gemma. */
export async function getIncident(incidentId) {
  if (MOCK_API) {
    return { id: incidentId, status: 'processing', priority: null, type: null, gemma_result: null };
  }
  const response = await fetch(`${API_BASE_URL}/incidents/${encodeURIComponent(incidentId)}`);
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GET /incidents/${incidentId} falló con status ${response.status}: ${detail}`);
  }
  return response.json();
}

/**
 * POST /sync/batch
 * @param {IncidentPayload[]} payloads
 * @returns {Promise<{ client_id: string, incident_id: string, status: string }[]>}
 */
export async function syncBatch(payloads) {
  if (MOCK_API) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return payloads.map((p) => ({
      client_id: p.clientId,
      incident_id: `mock-${p.clientId}`,
      status: 'processing',
    }));
  }

  const response = await fetch(`${API_BASE_URL}/sync/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      incidents: payloads.map((p) => ({
        description: p.description,
        lat: p.lat,
        lon: p.lon,
        client_id: p.clientId,
        created_at_client: p.createdAtClient,
        photo_urls: p.photoUrls ?? [],
        video_url: p.videoUrl ?? null,
      })),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`POST /sync/batch falló con status ${response.status}: ${detail}`);
  }

  return response.json();
}
