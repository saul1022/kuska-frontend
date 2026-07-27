import React from 'react';

/**
 * Marca de Kuska simplificada para uso en interfaz: la llama dentro del circulo
 * verde y el arco de conectividad. Las ruinas, las montanias y el wordmark del
 * logo completo se omiten porque a tamanio pequenio se vuelven ilegibles.
 * Comparte el trazo con el favicon (src/app/icon.svg).
 */
export const KuskaLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Kuska">
    <rect width="64" height="64" rx="14" fill="#2C4A34" />

    <g fill="none" stroke="#7A9471" strokeLinecap="round">
      <path d="M45.5 17.5a7 7 0 0 1 5 5" strokeWidth="2.2" />
      <path d="M45.5 12.5a12 12 0 0 1 8.6 8.6" strokeWidth="2.2" />
    </g>

    <ellipse cx="25.5" cy="20" rx="3.6" ry="7.6" fill="#F0E6D3" transform="rotate(-14 25.5 20)" />
    <ellipse cx="38.5" cy="20" rx="3.6" ry="7.6" fill="#F0E6D3" transform="rotate(14 38.5 20)" />

    <path
      d="M32 22.5c-6.2 0-10 4.2-10 9.4 0 3.1.9 5 .9 7.6 0 3.7-1.2 6-1.2 8.5h20.6c0-2.5-1.2-4.8-1.2-8.5 0-2.6.9-4.5.9-7.6 0-5.2-3.8-9.4-10-9.4z"
      fill="#F0E6D3"
    />

    <circle cx="28.2" cy="32.4" r="1.7" fill="#2C4A34" />
    <circle cx="35.8" cy="32.4" r="1.7" fill="#2C4A34" />
    <path d="M30.4 38.6h3.2" stroke="#2C4A34" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M32 38.6v1.6M32 40.2c-1.1 1.1-2.6.6-2.6-.6M32 40.2c1.1 1.1 2.6.6 2.6-.6"
      fill="none"
      stroke="#2C4A34"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
