import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('kuska.db');

/**
 * Borra los reportes de ejemplo sembrados por versiones anteriores. Tenian ids
 * '1'..'4' (no son UUID), sin GPS y con fotos remotas, asi que el sincronizador
 * los reintentaba sin parar y siempre fallaban: en pantalla parecia que la app
 * estaba rota.
 */
export function deleteSeedReports() {
  db.runSync(`DELETE FROM reports WHERE client_id IN ('1', '2', '3', '4')`);
}

export function initDb() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS reports (
      client_id TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      description TEXT,
      lat REAL,
      lon REAL,
      photo_uri TEXT,
      video_uri TEXT,
      created_at_client TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      incident_id TEXT
    );
  `);

  const existingColumns = new Set(
    db.getAllSync('PRAGMA table_info(reports)').map((column) => column.name)
  );
  const newColumns = {
    backend_status: 'TEXT', priority: 'TEXT', incident_type: 'TEXT', damage_level: 'TEXT',
    trapped_people_possible: 'INTEGER', secondary_risks: 'TEXT', explanation: 'TEXT',
    confidence: 'REAL', backend_updated_at: 'TEXT',
  };
  Object.entries(newColumns).forEach(([name, type]) => {
    if (!existingColumns.has(name)) db.execSync(`ALTER TABLE reports ADD COLUMN ${name} ${type}`);
  });
}

export function insertReport(report) {
  db.runSync(
    `INSERT INTO reports
      (client_id, title, description, lat, lon, photo_uri, video_uri, created_at_client, status, incident_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      report.clientId,
      report.title ?? null,
      report.description ?? null,
      report.lat ?? null,
      report.lon ?? null,
      report.photoUri ?? null,
      report.videoUri ?? null,
      report.createdAtClient,
      report.status ?? 'pending',
      report.incidentId ?? null,
    ]
  );
}

export function updateReportStatus(clientId, status, incidentId, backendStatus = null) {
  db.runSync(`UPDATE reports SET status = ?, incident_id = ?, backend_status = COALESCE(?, backend_status) WHERE client_id = ?`, [
    status,
    incidentId ?? null,
    backendStatus,
    clientId,
  ]);
}

export function saveIncidentDetail(clientId, detail) {
  const gemma = detail.gemma_result;
  db.runSync(
    `UPDATE reports SET incident_id = COALESCE(?, incident_id), backend_status = ?, priority = ?,
      incident_type = ?, damage_level = ?, trapped_people_possible = ?, secondary_risks = ?,
      explanation = ?, confidence = ?, backend_updated_at = ? WHERE client_id = ?`,
    [detail.id ?? null, detail.status ?? null, detail.priority ?? gemma?.priority ?? null,
      detail.type ?? gemma?.type ?? null, gemma?.damage_level ?? null,
      gemma?.trapped_people_possible == null ? null : Number(gemma.trapped_people_possible),
      JSON.stringify(gemma?.secondary_risks ?? []), gemma?.explanation ?? null,
      gemma?.confidence ?? null, new Date().toISOString(), clientId]
  );
}

export function getAllReports() {
  return db.getAllSync(`SELECT * FROM reports ORDER BY created_at_client DESC`);
}

export function getPendingReports() {
  return db.getAllSync(`SELECT * FROM reports WHERE status IN ('pending', 'error')`);
}

export function getReportsWithIncidentId() {
  return db.getAllSync(`SELECT * FROM reports WHERE incident_id IS NOT NULL`);
}

export function countReports() {
  const row = db.getFirstSync(`SELECT COUNT(*) as count FROM reports`);
  return row?.count ?? 0;
}
