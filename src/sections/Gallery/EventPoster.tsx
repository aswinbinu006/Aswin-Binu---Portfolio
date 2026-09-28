import React from "react";
import type { EventItem } from "@/data/events";
import NotchedProjectCard from "@/components/ui/notched-project-card";

interface EventPosterProps {
  event: EventItem;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Exhibition Wall Card - Powered by NotchedProjectCard with concentric cutout & arrow disc
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 */
export default function EventPoster({ event, onClick, onKeyDown }: EventPosterProps) {
  return (
    <div
      data-no-constellation
      id={`poster-${event.id}`}
      className="w-full"
    >
      <NotchedProjectCard
        title={event.title}
        description={event.summary}
        image={event.image}
        imageAlt={event.title}
        badge={event.year}
        tags={event.tags}
        monochrome={true}
        surface="#090a0f"
        accent="#ffffff"
        accentForeground="#000000"
        onClick={onClick}
        onKeyDown={onKeyDown}
        className="w-full"
      />
    </div>
  );
}
