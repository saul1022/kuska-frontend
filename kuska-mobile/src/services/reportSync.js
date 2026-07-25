import { createIncident, getIncident } from '../api/incidents';
import { saveIncidentDetail, updateReportStatus } from '../storage/db';

export async function refreshIncidentDetail(clientId, incidentId) {
  const detail = await getIncident(incidentId);
  saveIncidentDetail(clientId, detail);
  return detail;
}

export async function synchronizeReport(payload) {
  const accepted = await createIncident(payload);
  updateReportStatus(payload.clientId, 'synced', accepted.incident_id, accepted.status);
  try {
    await refreshIncidentDetail(payload.clientId, accepted.incident_id);
  } catch (error) {
    console.warn('El reporte se sincronizó, pero no se pudo actualizar su detalle:', error);
  }
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
