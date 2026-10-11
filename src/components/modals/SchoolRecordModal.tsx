import React from 'react';
import { School, MapPin, FileText, Calendar, BarChart2 } from 'lucide-react';
import { SchoolRecord } from '../../data/types';
import { Modal } from '../ui/Modal';

export interface SchoolRecordModalProps {
  record: SchoolRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolRecordModal: React.FC<SchoolRecordModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  if (!record) return null;

  const is12th = record.id === '12th';
  const subhead = is12th ? '12TH · HIGHER SECONDARY' : '10TH · SECONDARY';
  const title = is12th ? 'Science with Computer Science' : 'General Secondary Curriculum';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
            {subhead}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy">
            {title}
          </h2>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gold-border/40">
          <div className="flex items-start gap-3">
            <School className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                SCHOOL NAME
              </span>
              <span className="text-sm font-medium text-navy block">
                {record.institution}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                LOCATION
              </span>
              <span className="text-sm font-medium text-navy block">
                {record.location}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                BOARD
              </span>
              <span className="text-sm font-medium text-navy block">
                {record.board}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gold-text stroke-[1.75] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                YEAR OF PASSING
              </span>
              <span className="text-sm font-medium text-navy block">
                {record.year}
              </span>
            </div>
          </div>

          <div className="sm:col-span-2 flex items-start gap-3 pt-1">
            <BarChart2 className="w-6 h-6 text-gold-text stroke-[1.75] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                OVERALL SCORE
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-heading font-bold text-navy">
                  {record.overallScore}
                </span>
                {is12th && (
                  <span className="text-sm font-mono text-midnight/70">
                    (472 / 500)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subject Table */}
        <div className="rounded-xl border border-gold-border/60 bg-card overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 bg-warm/40 border-b border-gold-border/40 text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
            <div className="col-span-6">SUBJECT</div>
            <div className="col-span-2 text-center">MARKS</div>
            <div className="col-span-2 text-center">MAX</div>
            <div className="col-span-2 text-right">GRADE</div>
          </div>
          <div className="divide-y divide-gold-border/30 text-xs sm:text-sm">
            {record.subjects.map((sub, idx) => (
              <div key={idx} className="grid grid-cols-12 px-4 py-3 items-center">
                <div className="col-span-6 font-medium text-navy">{sub.subject}</div>
                <div className="col-span-2 text-center font-bold text-navy">
                  {sub.marks}
                </div>
                <div className="col-span-2 text-center text-midnight/70">
                  {sub.max}
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
