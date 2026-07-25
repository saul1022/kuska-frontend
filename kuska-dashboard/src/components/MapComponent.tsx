'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Incident } from '../types/incident';

interface MapComponentProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (incident: Incident) => void;
}

// Dynamically import MapComponentContent with SSR disabled to prevent Leaflet hydration errors
const DynamicMapContent = dynamic(
  () => import('./MapComponentContent').then((mod) => mod.MapComponentContent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[450px] bg-slate-950 flex flex-col items-center justify-center text-slate-400 p-6 rounded-2xl border border-slate-800">
        <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium">Cargando mapa georreferenciado Leaflet...</p>
      </div>
    ),
  }
);

export const MapComponent: React.FC<MapComponentProps> = (props) => {
  return <DynamicMapContent {...props} />;
};
