"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimeRangeSlider } from "@/components/ui/time-range-slider";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState([9, 14.5]); // 9:00 AM to 2:30 PM

  return (
    <main className="max-w-md mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-serif mb-8">Color2Meet</h1>
        
        <div className="space-y-4">
          <Input 
            placeholder="이벤트 제목을 입력하세요."
            className="text-center"
          />
          <p className="text-sm text-gray-500">이벤트 설명을 추가하세요.</p>
        </div>

        <Button variant="outline" className="w-full mt-4">
          테마 바꾸기
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <h2 className="font-medium">날짜 선택하기</h2>
        </div>
        <p className="text-sm text-gray-500">날짜를 클릭하거나 드래그하여 여러 날 선택</p>
        <div className="bg-secondary p-4 rounded-lg">
          <Calendar
            mode="multiple"
            selected={date ? [date] : []}
            onSelect={(date) => setDate(date)}
            className="rounded-md border"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <span className="text-lg">⏰</span>
          <h2 className="font-medium">시간 범위 설정하기</h2>
        </div>
        <div className="p-6 rounded-lg">
          <TimeRangeSlider
            startTime={formatTime(timeRange[0])}
            endTime={formatTime(timeRange[1])}
            value={timeRange}
            min={0}
            max={24}
            step={0.5}
            markerGap={2}
            minStepsBetweenThumbs={2}
            onValueChange={setTimeRange}
            color="from #BF72FF h s l"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Select defaultValue="Asia/Seoul">
          <SelectTrigger>
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Asia/Seoul">GMT +9:00 서울</SelectItem>
            <SelectItem value="America/New_York">GMT -4:00 뉴욕</SelectItem>
            <SelectItem value="Europe/London">GMT +1:00 런던</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">응답자, 응답결과 공개/비공개 설정</p>
      </div>

      <Button className="w-full bg-black text-white">이벤트 티켓 만들기</Button>
    </main>
  );
}

function formatTime(time: number) {
  const hours = Math.floor(time);
  const minutes = (time % 1) * 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}