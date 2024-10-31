'use client';

import * as React from 'react';
import { Slider as BaseSlider } from '@mui/base/Slider';

interface TimeRangeSliderProps {
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number[]) => void;
}

const TimeRangeSlider = React.forwardRef<HTMLSpanElement, TimeRangeSliderProps>(
  ({ defaultValue = [9, 14.5], min = 0, max = 24, step = 0.5, onChange }, ref) => {
    // Handle value change
    const handleChange = (_: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue) && onChange) {
        onChange(newValue);
      }
    };

    return (
      <BaseSlider
        ref={ref}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        slots={{
          root: 'span',
          rail: 'span',
          track: 'span',
          thumb: ThumbComponent,
        }}
        slotProps={{
          root: {
            className: 'relative inline-block w-full h-2 cursor-pointer'
          },
          rail: {
            className: 'absolute w-full h-full bg-gray-200 rounded-full'
          },
          track: {
            className: 'absolute h-full bg-primary rounded-full'
          },
          thumb: {
            // className: 'absolute size-4 -mt-1 -ml-2 bg-white rounded-full border-2 border-primary hover:border-4 hover:size-10 hover:-translate-y-3 hover:-translate-x-3',
            startTime: defaultValue[0],
            endTime: defaultValue[1],
          },
        }}
      />
    );
  }
);

// Thumb component with time display
const ThumbComponent = React.forwardRef<
  HTMLDivElement,
  { startTime?: string; endTime?: string; 'data-index'?: number }
>((props, ref) => {
  const { startTime, endTime, 'data-index': index, ...other } = props;
  const time = index === 0 ? startTime : endTime;

  return (
    <div className="relative">
      <div className="absolute size-4 rounded-full border-2 border-primary bg-background"/>
      <div ref={ref} {...other} />
          {/* <div className="absolute -translate-x-1/2 -translate-y-16">
            <div className="px-2 py-1 rounded bg-primary text-primary-foreground">
              {time}
            </div>
          </div> */}
    </div>
  );
});

TimeRangeSlider.displayName = 'TimeRangeSlider';
ThumbComponent.displayName = 'ThumbComponent';

export { TimeRangeSlider };