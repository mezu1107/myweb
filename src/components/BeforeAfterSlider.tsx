import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  title,
}: BeforeAfterSliderProps) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, isVisible } = useScrollAnimation();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div
      ref={scrollRef}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg bg-muted cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ maxHeight: "500px" }}
      >
        {/* Before Image */}
        <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />

        {/* After Image Overlay */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%`, transition: "none" }}
        >
          <img src={afterImage} alt={afterLabel} className="w-screen h-full object-cover" style={{ width: containerRef.current?.clientWidth }} />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-lg"
          style={{ left: `${sliderPos}%`, transition: "none" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-gray-800" />
              <div className="w-0.5 h-4 bg-gray-800" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded text-sm font-semibold pointer-events-none">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-sm font-semibold pointer-events-none">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};
