"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const TimeSliderComponent = () => {
  const [timeRange, setTimeRange] = useState([9, 14.5]);

  return (
    <div className="w-[300px] p-4">
      <Slider
        value={timeRange}
        min={0}
        max={24}
        step={0.5}
        onValueChange={setTimeRange}
      />
      <div className="flex justify-between mt-2 text-sm">
        <span>{formatTime(timeRange[0])}</span>
        <span>{formatTime(timeRange[1])}</span>
      </div>
    </div>
  );
};

function formatTime(time: number) {
  const hours = Math.floor(time);
  const minutes = (time % 1) * 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

const meta: Meta<typeof TimeSliderComponent> = {
  title: "Components/TimeSlider",
  component: TimeSliderComponent,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TimeSliderComponent>;

export const Default: Story = {};