'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface TimeRangeSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  startTime?: string;
  endTime?: string;
  markerGap?: number;
}

const Marker = () => {
  return <div className="relative size-0">
    <div className="absolute h-1 w-1 bg-zinc-400/50 rounded-full -translate-y-1/2 -translate-x-1/2"/>
  </div>
}

const TimeRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  TimeRangeSliderProps
>(({ className, startTime, endTime, color, min = 0, max = 24, step = 1, markerGap = 1, ...props }, ref) => (
  <div
    className="relative w-full"
    style={{
      ['--primary' as string]: color,
    }}
  >
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center px-2 bg-secondary box-border rounded-full', className)}
      min={min}
      max={max}
      step={step}
      {...props}
    >
      <SliderPrimitive.Track asChild>
        <div className="relative h-4 w-full grow flex items-center overflow-visible">
          <div className="relative w-full h-full flex items-center justify-between">
            {Array.from({ length: (max - min) / markerGap + 1 }).map((_, index) => (
              <Marker key={index} />
            ))}
          </div>
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
          <Thumb time={startTime} defaultTime="9:00" />
          <Thumb time={endTime} defaultTime="10:00" />
        </div>
      </SliderPrimitive.Track>
    </SliderPrimitive.Root>
  </div>
));

TimeRangeSlider.displayName = 'TimeRangeSlider';

export { TimeRangeSlider };

interface ThumbProps {
  time?: string;
  defaultTime: string;
}

const Thumb = ({ time, defaultTime }: ThumbProps) => {
  return (
    <SliderPrimitive.Thumb
      onPointerLeave={(event) => {
        // Remove focus
        event.currentTarget.blur();
      }}
      onPointerEnter={(event) => {
        event.currentTarget.focus();
      }}
      asChild
    >
      <div className="relative outline-none group h-10">
        {/* thumb */}
        <div className="absolute h-20 w-20 bg-red-500/0 bottom-0 left-1/2 -translate-x-1/2" />
        {/* value indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="absolute size-4 rounded-full border-2 border-primary bg-background disabled:pointer-events-none disabled:opacity-50 -translate-y-1/2 -translate-x-1/2 transition-all duration-200 group-focus:size-10 group-focus:border-4" />
          <div className="absolute -translate-y-8 -translate-x-1/2 transform transition-all duration-200 group-focus:-translate-y-12">
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.26795 12C7.03775 13.3333 8.96225 13.3333 9.73205 12L14.9282 3C15.698 1.66667 14.7358 0 13.1962 0H2.80385C1.26425 0 0.301996 1.66667 1.0718 3L6.26795 12Z"
                fill="hsl(var(--primary))"
              />
            </svg>
          </div>
          <div className="absolute -translate-x-1/2 transition-all duration-200 -translate-y-14 group-focus:-translate-y-16 group-focus:scale-110">
            <div className="px-3 py-1 bg-primary text-primary-foreground rounded-lg whitespace-nowrap">
              {time || defaultTime}
            </div>
          </div>
        </div>
      </div>
    </SliderPrimitive.Thumb>
  );
};