'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Incident } from '../types/incident';
import { Navbar } from '../components/Navbar';
import { MapComponent } from '../components/MapComponent';
import { IncidentList } from '../components/IncidentList';
import { IncidentDetail } from '../components/IncidentDetail';
import { Radio, Info } from 'lucide-react';
import { getIncident, listIncidents } from '../lib/incidentsApi';

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshIncidents = useCallback(async () => {
    try {
      const data = await listIncidents();
      setIncidents(data);
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo consultar el backend');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshIncidents();
    const intervalId = window.setInterval(() => void refreshIncidents(), 15_000);
    return () => window.clearInterval(intervalId);
  }, [refreshIncidents]);

  const handleSelectIncident = async (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDetailOpen(true);
    try {
      setSelectedIncident(await getIncident(incident.id));
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo cargar el detalle');
    }
  };

  const highPriorityCount = incidents.filter((i) => i.priority === 'alta').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <Navbar
        totalIncidents={incidents.length}
        highPriorityCount={highPriorityCount}
        onRefresh={() => void refreshIncidents()}
      />

      {error && (
        <div className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-rose-700/50 bg-rose-950/70 px-4 py-3 text-sm text-rose-200">
          No se pudo sincronizar el dashboard: {error}
        </div>
      )}

      {isLoading && (
        <div className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          Cargando incidentes desde Kuska API…
        </div>
      )}

      {/* Main Dashboard Layout Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section: Map View (8 cols) */}
        <section className="lg:col-span-8 flex flex-col space-y-4">
          {/* Status Alert Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
              <span className="font-semibold text-slate-200">
                Monitoreo Activo Post-Sismo — Zona Centro / Junín / Callao
              </span>
            </div>
            <span className="text-slate-400 hidden sm:inline-block">
              Sincronización en tiempo real habilitada
            </span>
          </div>

          {/* Interactive Map Component Container */}
          <div className="flex-1 min-h-[500px] h-[650px] relative">
            <MapComponent
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={handleSelectIncident}
            />
          </div>
        </section>

        {/* Right Section: Prioritized Sidebar List (4 cols) */}
        <section className="lg:col-span-4 h-[710px]">
          <IncidentList
            incidents={incidents}
            selectedIncident={selectedIncident}
            onSelectIncident={handleSelectIncident}
          />
        </section>
      </main>

      {/* Incident Detail Modal */}
      {isDetailOpen && selectedIncident && (
        <IncidentDetail
          incident={selectedIncident}
          onClose={() => setIsDetailOpen(false)}
        />
      )}

      {/* Footer / ODS Disclaimer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Kuska no reemplaza al CENSIS ni al INDECI. Apoya la toma de decisiones ciudadana.
          </span>
        </div>
        <p className="text-slate-400">
          Desarrollado para Hackathon <strong className="text-slate-300">"Build with Gemma" — GDG Callao</strong> (ODS 11)
        </p>
      </footer>
    </div>
  );
}
