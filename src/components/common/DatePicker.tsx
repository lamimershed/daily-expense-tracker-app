"use client";

import * as React from "react";
import { format } from "date-fns";
// import CalendarIcon from "@radix-ui/react-popover";
import { CalendarClock } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";

type Prop = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const DatePicker = ({ date, setDate }: Prop) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "3xl:h-[60px] h-[56px] w-full justify-between rounded-[10px] border border-[#B8B8B8] text-left text-[16px] font-normal xl:h-[42px]",
            !date && "text-muted-foreground",
          )}
        >
          {date ? (
            format(date, "yyyy-MM-dd") // should show 12 hour format
          ) : (
            <span className="text-[#3F3F3F]">Pick Date</span>
          )}
          <CalendarClock />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[101] w-auto bg-white p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            date?.setHours(17);
            setDate(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
export default DatePicker;
