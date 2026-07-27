import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getPendingReports, getReportsWithIncidentId, updateReportStatus } from '../storage/db';
import { payloadFromRow, refreshIncidentDetail, synchronizeReport } from '../services/reportSync';

/**
 * Escucha la conexión de red y, apenas hay conectividad, intenta subir
 * los reportes pendientes/con error uno por uno (POST /incidents mockeado
 * hasta que el backend esté listo). Actualiza SQLite y notifica via onChange.
 */
export function useNetworkSync(onChange) {
  const isSyncingRef = useRef(false);

  useEffect(() => {
    async function syncPending() {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      try {
        const pending = getPendingReports();
        for (const row of pending) {
          try {
            await synchronizeReport(payloadFromRow(row), onChange);
          } catch (e) {
            updateReportStatus(row.client_id, 'error', null);
          }
        }
        for (const row of getReportsWithIncidentId()) {
          try {
            await refreshIncidentDetail(row.client_id, row.incident_id);
          } catch (error) {
            console.warn('No se pudo refrescar el incidente:', error);
          }
        }
        onChange();
      } finally {
        isSyncingRef.current = false;
      }
    }

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable !== false) {
        syncPending();
      }
    });

    // Intento inicial por si ya hay conexión al abrir la app.
    NetInfo.fetch().then((state) => {
      if (state.isConnected && state.isInternetReachable !== false) {
        syncPending();
      }
    });

    return () => unsubscribe();
  }, [onChange]);
}
