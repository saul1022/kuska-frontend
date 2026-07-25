'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Incident } from '../types/incident';

interface MapComponentContentProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (incident: Incident) => void;
}

// Custom Leaflet Icons based on priority
const createCustomIcon = (priority: string, isSelected: boolean) => {
  let colorClass = 'bg-emerald-500 shadow-emerald-500/50';
  let ringColor = 'border-emerald-300';
  if (priority === 'alta') {
    colorClass = 'bg-rose-600 shadow-rose-600/60 animate-pulse';
    ringColor = 'border-rose-300';
  } else if (priority === 'media') {
    colorClass = 'bg-amber-500 shadow-amber-500/50';
    ringColor = 'border-amber-300';
  }

  const scaleClass = isSelected ? 'scale-125 z-50 ring-4 ring-white' : 'scale-100';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center transition-all duration-300 ${scaleClass}">
        <div class="w-8 h-8 rounded-full ${colorClass} ${ringColor} border-2 shadow-lg flex items-center justify-center text-white font-bold text-xs">
          ${priority === 'alta' ? '!' : priority === 'media' ? 'M' : 'B'}
        </div>
        <div class="absolute -bottom-1 w-2 h-2 ${colorClass} rotate-45"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Helper component to smoothly center map when selected incident changes
const MapRecenter = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.flyTo([lat, lon], 14, { duration: 1.2 });
    }
  }, [lat, lon, map]);
  return null;
};

export const MapComponentContent: React.FC<MapComponentContentProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
}) => {
  const centerLat = selectedIncident ? selectedIncident.lat : -12.04637;
  const centerLon = selectedIncident ? selectedIncident.lon : -77.04279;

  return (
    <div className="w-full h-full min-h-[450px] relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <MapContainer
        center={[centerLat, centerLon]}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[450px] z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedIncident && (
          <MapRecenter lat={selectedIncident.lat} lon={selectedIncident.lon} />
        )}

        {incidents.map((incident) => {
          const isSelected = selectedIncident?.id === incident.id;
          const customIcon = createCustomIcon(incident.priority, isSelected);

          return (
            <Marker
              key={incident.id}
              position={[incident.lat, incident.lon]}
              icon={customIcon}
              eventHandlers={{
                click: () => onSelectIncident(incident),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 max-w-xs text-slate-900">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded text-white ${
                        incident.priority === 'alta'
                          ? 'bg-rose-600'
                          : incident.priority === 'media'
                          ? 'bg-amber-600'
                          : 'bg-emerald-600'
                      }`}
                    >
                      Prioridad {incident.priority}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(incident.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                    {incident.address_reference || 'Ubicación Georreferenciada'}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                    {incident.description}
                  </p>
                  <button
                    onClick={() => onSelectIncident(incident)}
                    className="mt-2 w-full py-1 text-[11px] font-semibold text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
                  >
                    Ver Evaluación Gemma 4
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl shadow-xl text-white text-xs space-y-1.5 pointer-events-auto">
        <p className="font-semibold text-slate-300 border-b border-slate-800 pb-1 mb-1">
          Prioridad del Sismo
        </p>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse"></span>
          <span>Alta / Crítica (Rescate/Riesgo)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span>Media (Daño Estructural)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span>Baja (Servicio / Leve)</span>
        </div>
      </div>
    </div>
  );
};
