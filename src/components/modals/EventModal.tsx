import React, { useState } from 'react';
import { User, Users, Trophy } from 'lucide-react';
import { EventItem } from '../../data/types';
import { Modal } from '../ui/Modal';

export interface EventModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!event) return null;

  const photos = event.photos || [];
  const mainPhoto = photos.length > 0 ? photos[activePhotoIdx]?.src : event.poster?.src;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="3xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Main Poster + Thumbnails */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-midnight/30 bg-[#120a10] aspect-[4/3] shadow-md">
            <img
              src={mainPhoto}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`rounded-lg overflow-hidden border transition-all ${
                    activePhotoIdx === idx
                      ? 'border-gold ring-2 ring-gold/40'
                      : 'border-gold-border/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Event Details */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
              TECHNICAL EVENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy">
              {event.title}
            </h2>
            {event.subtitle && (
              <span className="text-sm font-medium text-midnight/70 block">
                {event.subtitle}
              </span>
            )}
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 rounded-full text-xs font-medium bg-warm/50 text-midnight border border-gold-border/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 3 Stats Row */}
          {(event.role || event.teamSize || event.participants) && (
            <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-warm/30 border border-gold-border/40 text-center">
              {event.role && (
                <div>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-mono uppercase text-gold-text font-semibold mb-0.5">
                    <User className="w-3.5 h-3.5" />
                    <span>My Role</span>
                  </div>
                  <span className="font-medium text-navy text-xs sm:text-sm block truncate">
                    {event.role}
                  </span>
                </div>
              )}
              {event.teamSize && (
                <div>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-mono uppercase text-gold-text font-semibold mb-0.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Team Size</span>
                  </div>
                  <span className="font-medium text-navy text-xs sm:text-sm block">
                    {event.teamSize}
                  </span>
                </div>
              )}
              {event.participants && (
                <div>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-mono uppercase text-gold-text font-semibold mb-0.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Participants</span>
                  </div>
                  <span className="font-medium text-navy text-xs sm:text-sm block">
                    {event.participants}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base text-midnight/85 leading-relaxed">
            {event.description}
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-midnight/50 hover:border-navy text-midnight hover:text-navy hover:bg-warm/40 transition-all duration-200 text-sm font-medium"
            >
              <span>View photos</span>
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
