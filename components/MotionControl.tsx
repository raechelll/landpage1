"use client";
import { Pause, Play } from "lucide-react";
import "./motion-control.css";
export default function MotionControl({ enabled, onToggle, label }: {
  enabled: boolean; onToggle: () => void; label: string;
}) {
  const title = `${enabled ? "Jeda" : "Putar"} ${label}`;
  return <button type="button" className="motion-control" aria-label={title} title={title}
    aria-pressed={enabled} onClick={onToggle}>
    {enabled ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
  </button>;
}
