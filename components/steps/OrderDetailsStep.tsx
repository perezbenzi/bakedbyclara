'use client';

import { useState } from 'react';
import { config } from '@/lib/config';
import { StepHeader } from '../StepHeader';

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
    <div className="flex flex-col min-h-screen bg-cream">
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
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white font-inter text-gray-900 text-sm outline-none transition-colors placeholder:text-gray-300 ${
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

        {/* Pickup address (read-only) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 mt-0.5"
              style={{ backgroundColor: `${config.primaryColor}20` }}
            >
              📍
            </div>
            <div>
              <p className="font-inter font-semibold text-gray-900 text-sm">
                Pickup location
              </p>
              <p className="font-inter text-gray-500 text-sm mt-0.5">
                {config.pickupAddress}
              </p>
              <p className="font-inter text-gray-400 text-xs mt-1.5 leading-relaxed">
                {"We'll confirm the exact time via WhatsApp"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed footer — sits above the bottom navbar */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 backdrop-blur-sm border-t border-gray-100 px-5 py-4 z-20">
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-full text-white font-inter font-semibold text-sm active:scale-[0.98] transition-transform"
          style={{ backgroundColor: config.primaryColor }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
