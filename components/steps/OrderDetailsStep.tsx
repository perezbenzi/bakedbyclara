'use client';

import { useState } from 'react';
import { config } from '@/lib/config';
import { StepHeader } from '../StepHeader';
import { StickyFooter } from '../StickyFooter';

interface OrderDetailsStepProps {
  name: string;
  slot: string;
  onNameChange: (value: string) => void;
  onSlotChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function OrderDetailsStep({
  name,
  slot,
  onNameChange,
  onSlotChange,
  onContinue,
  onBack,
}: OrderDetailsStepProps) {
  const [errors, setErrors] = useState({ name: false, slot: false });

  const handleContinue = () => {
    const trimmed = name.trim();
    const nameErr = trimmed.length === 0;
    const slotErr = slot === '';
    setErrors({ name: nameErr, slot: slotErr });
    if (!nameErr && !slotErr) {
      onNameChange(trimmed);
      onContinue();
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-cream">
      <StepHeader title="Your details" onBack={onBack} />

      <div className="px-4 pt-5 pb-36 flex flex-col gap-5">
        {/* Name input */}
        <div>
          <label className="font-inter text-sm font-medium text-gray-700 block mb-2">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              onNameChange(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: false }));
            }}
            placeholder="e.g. Jane Smith"
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white font-inter text-gray-900 text-sm focus:text-base outline-none transition-colors placeholder:text-gray-300 ${
              errors.name
                ? 'border-red-400'
                : 'border-transparent focus:border-primary'
            }`}
          />
          {errors.name && (
            <p className="font-inter text-red-400 text-xs mt-1.5">
              Please enter your full name
            </p>
          )}
        </div>

        {/* Pickup slot selector */}
        <div>
          <label className="font-inter text-sm font-medium text-gray-700 block mb-2">
            Pickup slot
          </label>
          <div className="flex gap-3">
            {config.availableSlots.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onSlotChange(s);
                  if (errors.slot) setErrors((p) => ({ ...p, slot: false }));
                }}
                className={`flex-1 py-4 rounded-xl font-inter font-semibold text-sm border-2 transition-all active:scale-95 ${
                  slot === s
                    ? 'text-white border-transparent'
                    : 'text-gray-600 bg-white border-transparent'
                } ${errors.slot && slot !== s ? 'border-red-300' : ''}`}
                style={slot === s ? { backgroundColor: config.primaryColor } : {}}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.slot && (
            <p className="font-inter text-red-400 text-xs mt-1.5">
              Please choose a pickup slot
            </p>
          )}
        </div>

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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.pickupAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center py-3.5 rounded-xl font-inter font-semibold text-sm border-2 active:scale-[0.98] transition-transform"
              style={{ borderColor: config.primaryColor, color: config.primaryColor, backgroundColor: 'transparent' }}
            >
              Get directions
            </a>
            <p className="font-inter text-gray-400 text-xs mt-3 leading-relaxed">
              {"We'll confirm the exact time via WhatsApp"}
            </p>
          </div>
        </div>
      </div>

      {/* Fixed footer — sits above the bottom navbar */}
      <StickyFooter>
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-full text-white font-inter font-semibold text-sm active:scale-[0.98] transition-transform"
          style={{ backgroundColor: config.primaryColor }}
        >
          Continue
        </button>
      </StickyFooter>
    </div>
  );
}
