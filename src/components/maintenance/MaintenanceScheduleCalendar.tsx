import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MaintenanceScheduleCalendarProps {
  compact?: boolean;
}

const MaintenanceScheduleCalendar = ({
  compact = false,
}: MaintenanceScheduleCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock data for scheduled maintenance events
  const mockEvents = [
    {
      id: "evt-1",
      title: "HVAC Inspection",
      date: "2023-06-15",
      property: "Sunset Apartments",
      assignedTo: "John Smith",
    },
    {
      id: "evt-2",
      title: "Plumbing Maintenance",
      date: "2023-06-18",
      property: "Parkview Residences",
      assignedTo: "Plumbing Pros",
    },
    {
      id: "evt-3",
      title: "Fire Alarm Testing",
      date: "2023-06-22",
      property: "Highland Towers",
      assignedTo: "Safety First Inc.",
    },
    {
      id: "evt-4",
      title: "Elevator Maintenance",
      date: "2023-06-25",
      property: "Riverside Condos",
      assignedTo: "Elevator Tech Co.",
    },
    {
      id: "evt-5",
      title: "Landscaping",
      date: "2023-06-28",
      property: "Sunset Apartments",
      assignedTo: "Green Thumb Services",
    },
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthName = currentMonth.toLocaleString("default", { month: "long" });

    const days = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Add weekday headers
    const weekdayHeaders = weekdays.map((day) => (
      <div
        key={`header-${day}`}
        className="text-center font-medium p-1 border-b text-xs"
      >
        {day}
      </div>
    ));

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-1 border min-h-[60px] bg-muted/20"
        ></div>,
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = mockEvents.filter((event) => event.date === date);

      days.push(
        <div
          key={`day-${day}`}
          className="p-1 border min-h-[60px] hover:bg-muted/10"
        >
          <div className="text-xs font-medium">{day}</div>
          {dayEvents.length > 0 && (
            <div className="mt-1">
              {compact ? (
                <Badge className="text-[10px] px-1 py-0 h-4">
                  {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}
                </Badge>
              ) : (
                dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="mt-1 p-1 text-[10px] rounded bg-primary/10 border border-primary/20 truncate"
                  >
                    {event.title}
                  </div>
                ))
              )}
            </div>
          )}
        </div>,
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold">
            {monthName} {year}
          </h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {weekdayHeaders}
          {days}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-4">{renderCalendar()}</CardContent>
    </Card>
  );
};

export default MaintenanceScheduleCalendar;
