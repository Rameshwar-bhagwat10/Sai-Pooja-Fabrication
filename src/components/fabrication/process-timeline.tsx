import * as React from "react";

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
}

export interface ProcessTimelineProps {
  steps?: TimelineStep[];
}

export function ProcessTimeline({ steps = [] }: ProcessTimelineProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {steps.map((s, idx) => (
        <div key={idx} className="p-6 rounded-[14px] bg-white border border-black/10">
          <span className="text-micro font-mono text-[#C8913D]">{s.step}</span>
          <h4 className="text-lg font-bold font-display mt-2">{s.title}</h4>
          <p className="text-small text-[#6E746F] mt-2">{s.description}</p>
        </div>
      ))}
    </div>
  );
}
