export function mapDbRowToReport(row) {
  return {
    id: row.client_id,
    title:
      row.title ||
      (row.description ? row.description.slice(0, 40) : 'Reporte sin descripción'),
    description: row.description || 'Sin descripción registrada.',
    date: new Date(row.created_at_client).toLocaleString('es-PE', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }),
    location:
      row.lat != null && row.lon != null
        ? `${row.lat.toFixed(4)}, ${row.lon.toFixed(4)}`
        : 'Sin GPS',
    status: row.status,
    displayStatus: row.backend_status || row.status,
    backendStatus: row.backend_status,
    incidentId: row.incident_id,
    priority: row.priority,
    incidentType: row.incident_type,
    damageLevel: row.damage_level,
    trappedPeoplePossible: row.trapped_people_possible == null ? null : Boolean(row.trapped_people_possible),
    secondaryRisks: parseRisks(row.secondary_risks),
    explanation: row.explanation,
    confidence: row.confidence,
    backendUpdatedAt: row.backend_updated_at,
    imageUrl: row.photo_uri,
    videoUri: row.video_uri,
  };
}

function parseRisks(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
