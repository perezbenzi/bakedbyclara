'use client';

import { config } from '@/lib/config';

export function InfoStep() {
  const waUrl = `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`;
  const mapsQuery = config.pickupAddress;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

  return (
    <div className="flex flex-col min-h-screen bg-cream pb-20">
      {/* Header */}
      <div className="pt-10 pb-6 px-5 text-center">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl shadow-md"
          style={{ backgroundColor: config.primaryColor }}
        >
          🍪
        </div>
        <h1 className="font-inter font-bold text-2xl text-gray-900">{config.businessName}</h1>
        <p className="font-inter text-gray-400 text-sm mt-1">{config.tagline}</p>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* Pickup address */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(config.pickupAddress)}&output=embed&zoom=13`}
            width="100%"
            height="180"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
          />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">📍</span>
              <h2 className="font-inter font-semibold text-gray-900 text-base">Pickup location</h2>
            </div>
            <p className="font-inter text-gray-500 text-sm mb-4">{config.pickupAddress}</p>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center py-3.5 rounded-xl text-white font-inter font-semibold text-sm shadow-sm active:scale-[0.98] transition-transform"
              style={{ backgroundColor: config.primaryColor }}
            >
              Get directions
            </a>
            <p className="font-inter text-gray-400 text-xs mt-3 leading-relaxed">
              {"We'll confirm the exact time via WhatsApp"}
            </p>
          </div>
        </div>

        {/* Available slots */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🕐</span>
            <h2 className="font-inter font-semibold text-gray-900 text-base">Available pickup slots</h2>
          </div>
          <div className="flex gap-2">
            {config.availableSlots.map((slot) => (
              <span
                key={slot}
                className="px-4 py-2 rounded-full font-inter text-sm font-medium text-white"
                style={{ backgroundColor: config.primaryColor }}
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-inter font-semibold text-sm shadow-md active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#1a9e50' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}
