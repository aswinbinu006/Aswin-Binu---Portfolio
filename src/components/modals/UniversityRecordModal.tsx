import React, { useState } from 'react';
import { Landmark, GraduationCap, MapPin, Calendar, BarChart2 } from 'lucide-react';
import { UniversityRecord } from '../../data/types';
import { Modal } from '../ui/Modal';

export interface UniversityRecordModalProps {
  record: UniversityRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UniversityRecordModal: React.FC<UniversityRecordModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  const [selectedSemIdx, setSelectedSemIdx] = useState(0);

  if (!record) return null;

  const currentSemester = record.semesters[selectedSemIdx] || record.semesters[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
            UNIVERSITY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-navy leading-tight">
            B.Tech Computer Science &amp; Engineering (AI &amp; ML)
          </h2>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 pt-1 border-t border-gold-border/40">
          <div className="flex items-center gap-3 py-1">
            <Landmark className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                INSTITUTE
              </span>
              <span className="text-sm sm:text-base font-medium text-navy">
                {record.institute}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <GraduationCap className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                UNIVERSITY
              </span>
              <span className="text-sm sm:text-base font-medium text-navy">
                {record.university}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <MapPin className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                LOCATION
              </span>
              <span className="text-sm sm:text-base font-medium text-navy">
                {record.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <Calendar className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                DURATION
              </span>
              <span className="text-sm sm:text-base font-medium text-navy">
                {record.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <BarChart2 className="w-6 h-6 text-gold-text stroke-[1.75] shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                CURRENT CGPA
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-heading font-bold text-navy">
                  {record.cgpa}
                </span>
                <span className="text-xs text-midnight/70 font-mono">
                  out of 10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Semester Summary Table */}
        <div className="rounded-xl border border-gold-border/60 bg-card overflow-hidden">
          <div className="grid grid-cols-4 px-4 py-3 bg-warm/40 border-b border-gold-border/40 text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
            <div>SEMESTER</div>
            <div className="text-center">SGPA</div>
            <div className="text-center">CREDITS</div>
            <div className="text-right">STATUS</div>
          </div>
          <div className="divide-y divide-gold-border/30 text-xs sm:text-sm">
            {record.semesters.map((sem, idx) => (
              <div key={idx} className="grid grid-cols-4 px-4 py-2.5 items-center">
                <div className="font-medium text-navy">Semester {idx + 1}</div>
                <div className="text-center text-midnight font-medium">
                  {sem.sgpa ? sem.sgpa.toFixed(2) : '-'}
                </div>
                <div className="text-center text-midnight">
                  {sem.credits || 20}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                      sem.sgpa
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}
                  >
                    {sem.sgpa ? 'Completed' : 'Current'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semester Selection Pills */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-2">
            {record.semesters.map((sem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSemIdx(idx)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedSemIdx === idx
                    ? 'bg-midnight text-ivory shadow-sm'
                    : 'bg-warm/40 text-midnight hover:bg-warm/70 border border-gold-border/40'
                }`}
              >
                {sem.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Details Table for Selected Semester */}
        <div className="rounded-xl border border-gold-border/60 bg-card overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2.5 bg-warm/40 border-b border-gold-border/40 text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
            <div className="col-span-8">SUBJECT</div>
            <div className="col-span-2 text-center">CREDITS</div>
            <div className="col-span-2 text-right">GRADE</div>
          </div>
          <div className="divide-y divide-gold-border/30 text-xs sm:text-sm">
            {currentSemester.subjects.map((sub, idx) => (
              <div key={idx} className="grid grid-cols-12 px-4 py-2.5 items-center">
                <div className="col-span-8 font-medium text-navy">{sub.name}</div>
                <div className="col-span-2 text-center text-midnight">
                  {sub.credits || '-'}
                </div>
                <div className="col-span-2 text-right font-medium text-navy">
                  {sub.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
