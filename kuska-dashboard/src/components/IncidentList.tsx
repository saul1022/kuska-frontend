import React, { useState } from 'react';
import { Incident, Priority } from '../types/incident';
import { Search, MapPin, Clock, Filter, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface IncidentListProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (incident: Incident) => void;
}

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
}) => {
  const [filterPriority, setFilterPriority] = useState<Priority | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredIncidents = incidents.filter((incident) => {
    const matchesPriority = filterPriority === 'todas' || incident.priority === filterPriority;
    const matchesSearch =
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (incident.address_reference &&
        incident.address_reference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-white">
      {/* Search & Filter Header */}
      <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/50">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            Reportes Priorizados
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
            {filteredIncidents.length} / {incidents.length}
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por zona o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center space-x-1.5 text-xs overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterPriority('todas')}
            className={`px-3 py-1 rounded-lg font-medium transition whitespace-nowrap ${
              filterPriority === 'todas'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterPriority('alta')}
            className={`px-3 py-1 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-1 ${
              filterPriority === 'alta'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 border border-rose-900/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            Alta
          </button>
          <button
            onClick={() => setFilterPriority('media')}
            className={`px-3 py-1 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-1 ${
              filterPriority === 'media'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 border border-amber-900/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Media
          </button>
          <button
            onClick={() => setFilterPriority('baja')}
            className={`px-3 py-1 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-1 ${
              filterPriority === 'baja'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-900/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Baja
          </button>
        </div>
      </div>

      {/* Cards List Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 max-h-[600px] scrollbar-thin scrollbar-thumb-slate-800">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-10 text-slate-500 space-y-2">
            <AlertTriangle className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-xs">No se encontraron reportes con estos criterios.</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isSelected = selectedIncident?.id === incident.id;

            return (
              <div
                key={incident.id}
                onClick={() => onSelectIncident(incident)}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/50 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                {/* Priority Indicator Bar */}
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${
                    incident.priority === 'alta'
                      ? 'bg-rose-500'
                      : incident.priority === 'media'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="flex items-start gap-3 pl-1">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-800">
                    <img
                      src={incident.thumbnail_url || incident.photos[0]}
                      alt="Evidencia"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span
                      className={`absolute bottom-0 inset-x-0 text-[9px] text-center font-bold text-white uppercase py-0.5 ${
                        incident.priority === 'alta'
                          ? 'bg-rose-600/90'
                          : incident.priority === 'media'
                          ? 'bg-amber-600/90'
                          : 'bg-emerald-600/90'
                      }`}
                    >
                      {incident.priority}
                    </span>
                  </div>

                  {/* Incident Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-xs text-white truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                        <span className="truncate">
                          {incident.address_reference || `GPS: ${incident.lat.toFixed(3)}, ${incident.lon.toFixed(3)}`}
                        </span>
                      </h3>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition" />
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2 mb-2 leading-snug">
                      {incident.description}
                    </p>

                    {/* Metadata footer */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>
                          {new Date(incident.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      {incident.gemma_result && (
                        <div className="flex items-center gap-1 text-indigo-300 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                          <span>Gemma 4 Evaluado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
