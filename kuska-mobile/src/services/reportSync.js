import { createIncident, getIncident } from '../api/incidents';
import { saveIncidentDetail, updateReportStatus } from '../storage/db';

const TERMINAL_STATUSES = new Set(['validated', 'needs_review', 'processing_failed']);
const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 30;

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function refreshIncidentDetail(clientId, incidentId) {
  const detail = await getIncident(incidentId);
  saveIncidentDetail(clientId, detail);
  return detail;
}

export async function pollIncidentAnalysis(clientId, incidentId, onChange) {
  let lastDetail = null;
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt += 1) {
    try {
      lastDetail = await refreshIncidentDetail(clientId, incidentId);
      onChange?.();
      if (TERMINAL_STATUSES.has(lastDetail.status)) return lastDetail;
    } catch (error) {
      console.warn(`No se pudo consultar Gemma (intento ${attempt + 1}):`, error);
    }
    await wait(POLL_INTERVAL_MS);
  }
  return lastDetail;
}

export async function synchronizeReport(payload, onChange) {
  const accepted = await createIncident(payload);
  updateReportStatus(payload.clientId, 'synced', accepted.incident_id, accepted.status);
  onChange?.();
  await pollIncidentAnalysis(payload.clientId, accepted.incident_id, onChange);
  return accepted;
}

export function payloadFromRow(row) {
  return {
    clientId: row.client_id,
    description: row.description,
    lat: row.lat,
    lon: row.lon,
    createdAtClient: row.created_at_client,
    photoUris: row.photo_uri ? [row.photo_uri] : [],
    videoUri: row.video_uri,
  };
}
