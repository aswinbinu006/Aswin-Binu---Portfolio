import React, { useRef, useEffect } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = '/assets/intro.mp4',
  title = 'Aswin Binu — Personal Introduction',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay with sound might be blocked by browser policy
      });
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      hideDefaultHeader={true}
      maxWidth="3xl"
      contentClassName="p-4 sm:p-6 overflow-hidden bg-navy text-ivory"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pr-8 border-b border-ivory/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-ivory">
                {title}
              </h3>
              <p className="text-xs text-ivory/70 font-mono">
                AI &amp; Machine Learning Engineer
              </p>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden bg-midnight/90 border border-gold-border/40 shadow-2xl aspect-video flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            playsInline
            className="w-full h-full object-contain bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between text-xs text-ivory/70 pt-1">
          <span className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-gold fill-gold" />
            <span>Interactive Introduction Video</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-gold hover:text-gold-light underline text-xs"
          >
            Close Video
          </button>
        </div>
      </div>
    </Modal>
  );
};
