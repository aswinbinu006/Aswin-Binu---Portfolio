import React from 'react';
import type { TechItem } from '@/data/skills';

interface SkillDetailModalProps {
  item: TechItem | null;
  onClose: () => void;
}

export default function SkillDetailModal({ item, onClose }: SkillDetailModalProps) {
  if (!item) return null;
  return null;
}
