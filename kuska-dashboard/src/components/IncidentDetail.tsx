import React, { useState } from 'react';
import { Incident } from '../types/incident';
import {
  X,
  MapPin,
  Clock,
  Cpu,
  ShieldAlert,
  AlertOctagon,
  CheckCircle,
  FileText,
  Camera,
  ExternalLink,
  Flame,
  Zap,
  HelpCircle,
} from 'lucide-react';

interface IncidentDetailProps {
  incident: Incident | null;
  onClose: () => void;
  onValidate?: (id: string) => void;
}

export const IncidentDetail: React.FC<IncidentDetailProps> = ({
  incident,
  onClose,
  onValidate,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!incident) return null;

  const { gemma_result } = incident;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl text-white flex flex-col my-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-20">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                incident.priority === 'alta'
                  ? 'bg-rose-500 animate-ping'
                  : incident.priority === 'media'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">
                  Incidente #{incident.id}
                </h2>
                <span
                  className={`text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                    incident.priority === 'alta'
                      ? 'bg-rose-950 text-rose-300 border border-rose-700/50'
                      : incident.priority === 'media'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700/50'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                  }`}
                >
                  Prioridad {incident.priority}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                {incident.address_reference || `GPS: ${incident.lat}, ${incident.lon}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Media & Citizen Report (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Photo Gallery */}
            <div className="space-y-2">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
                <img
                  src={incident.photos[selectedPhotoIndex] || incident.thumbnail_url}
                  alt="Evidencia del ciudadano"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] text-white font-medium flex items-center gap-1">
                  <Camera className="w-3 h-3 text-slate-300" />
                  Evidencia {selectedPhotoIndex + 1}/{incident.photos.length}
                </div>
              </div>

              {/* Photos selector thumbnails */}
              {incident.photos.length > 1 && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {incident.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                        selectedPhotoIndex === idx
                          ? 'border-indigo-500 scale-105'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Citizen Text Description Box */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Relato del Ciudadano
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(incident.created_at).toLocaleString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800/50">
                "{incident.description}"
              </p>
              <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                <span>UUID Móvil: <code className="text-slate-300 font-mono">{incident.client_id}</code></span>
                <span className="text-emerald-400 font-medium">✓ Sincronizado</span>
              </div>
            </div>
          </div>

          {/* Right Column: Gemma 4 Multimodal AI Assessment (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 p-5 rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
              {/* AI Header */}
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      Evaluación Multimodal — Gemma 4
                    </h3>
                    <p className="text-[11px] text-indigo-300">
                      Análisis conjunto de imagen + texto + contexto
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 px-2 py-1 rounded-md font-mono">
                  JSON Válido ✓
                </span>
              </div>

              {gemma_result ? (
                <>
                  {/* Category & Damage Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block mb-1">Tipo de Incidente</span>
                      <span className="font-bold text-xs text-indigo-300 uppercase tracking-wider">
                        {gemma_result.type.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block mb-1">Nivel de Daño</span>
                      <span
                        className={`font-bold text-xs uppercase px-2 py-0.5 rounded ${
                          gemma_result.damage_level === 'critico' || gemma_result.damage_level === 'severo'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {gemma_result.damage_level}
                      </span>
                    </div>
                  </div>

                  {/* Trapped People Alert Box (if true) */}
                  {gemma_result.trapped_people_possible && (
                    <div className="bg-rose-950/70 border border-rose-600/50 p-3 rounded-xl flex items-center space-x-3 text-rose-200 animate-pulse">
                      <AlertOctagon className="w-6 h-6 text-rose-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-rose-100">Posible Confina / Personas Atrapadas</h4>
                        <p className="text-[11px] text-rose-300">
                          Gemma 4 infirió posible presencia humana atrapada por colapso estructural.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Secondary Risks Pills */}
                  {gemma_result.secondary_risks && gemma_result.secondary_risks.length > 0 && (
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block mb-1.5">
                        Riesgos Secundarios Identificados:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {gemma_result.secondary_risks.map((risk, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 flex items-center gap-1"
                          >
                            {risk.includes('cable') || risk.includes('electr') ? (
                              <Zap className="w-3 h-3 text-amber-400" />
                            ) : risk.includes('fuego') || risk.includes('incendio') ? (
                              <Flame className="w-3 h-3 text-rose-400" />
                            ) : (
                              <ShieldAlert className="w-3 h-3 text-indigo-400" />
                            )}
                            {risk.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Explanation Box */}
                  <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Explicación del Razonamiento (IA Explicable):
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      "{gemma_result.explanation}"
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Procesando evidencia en Gemma 4...
                </div>
              )}
            </div>

            {/* Operator Actions / Validation Footer */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-slate-400">
                <span>Estado: </span>
                <span className="font-semibold text-amber-400 uppercase">
                  {incident.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  Cerrar
                </button>
                {onValidate && (
                  <button
                    onClick={() => {
                      onValidate(incident.id);
                      onClose();
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Validar Incidente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
