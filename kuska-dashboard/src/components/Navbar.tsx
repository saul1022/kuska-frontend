import React from 'react';
import { Activity, ShieldAlert, Cpu, Globe, RefreshCw } from 'lucide-react';

interface NavbarProps {
  totalIncidents: number;
  highPriorityCount: number;
  onRefresh?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalIncidents,
  highPriorityCount,
  onRefresh,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 flex items-center justify-center shadow-md shadow-rose-500/20">
            <Activity className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Kuska <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">Dashboard</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Centro de Mando y Priorización Ciudadana Post-Sismo
            </p>
          </div>
        </div>

        {/* Live Metrics & AI Badge */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs">
          {/* AI Badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
            <Cpu className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            <span className="font-medium">Gemma 4 Multimodal</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Incident Stats */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400">Total:</span>
            <span className="font-bold text-white">{totalIncidents}</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/70 border border-rose-600/40 text-rose-300">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Críticos / Alta:</span>
            <span className="font-bold text-rose-200">{highPriorityCount}</span>
          </div>

          {/* ODS Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
            <Globe className="w-4 h-4" />
            <span>ODS 11 — Ciudades Sostenibles</span>
          </div>

          {/* Refresh Button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
              title="Actualizar incidentes"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
