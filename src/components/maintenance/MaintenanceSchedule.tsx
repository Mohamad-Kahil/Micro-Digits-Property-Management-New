import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MaintenanceSchedule = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    property: "",
    assignedTo: "",
    description: "",
  });

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

  const handleAddEvent = () => {
    console.log("Adding event:", newEvent);
    setIsAddEventOpen(false);
    // In a real app, you would save the event to your backend
  };

  const handleUpdateEvent = (updatedEvent) => {
    console.log("Updating event:", updatedEvent);
    // In a real app, you would update the event in your backend
    setIsEventDetailsOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    console.log("Deleting event:", eventId);
    // In a real app, you would delete the event from your backend
    setIsEventDetailsOpen(false);
  };

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
        className="text-center font-medium p-2 border-b"
      >
        {day}
      </div>
    ));

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-2 border min-h-[100px] bg-muted/20"
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
          className="p-2 border min-h-[100px] hover:bg-muted/10"
        >
          <div className="font-medium">{day}</div>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="mt-1 p-1 text-xs rounded bg-primary/10 border border-primary/20"
            >
              <div className="font-medium">{event.title}</div>
              <div className="text-muted-foreground">{event.assignedTo}</div>
            </div>
          ))}
        </div>,
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {monthName} {year}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" />
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Maintenance Schedule
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage scheduled maintenance activities across your
            properties.
          </p>
        </div>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Schedule Maintenance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule Maintenance</DialogTitle>
              <DialogDescription>
                Add a new scheduled maintenance event to the calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="e.g. HVAC Inspection"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="property">Property</Label>
                <Select
                  value={newEvent.property}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, property: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sunset Apartments">
                      Sunset Apartments
                    </SelectItem>
                    <SelectItem value="Parkview Residences">
                      Parkview Residences
                    </SelectItem>
                    <SelectItem value="Highland Towers">
                      Highland Towers
                    </SelectItem>
                    <SelectItem value="Riverside Condos">
                      Riverside Condos
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input
                  id="assignedTo"
                  value={newEvent.assignedTo}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, assignedTo: e.target.value })
                  }
                  placeholder="Staff member or vendor"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Details about the maintenance activity"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddEvent}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Calendar</CardTitle>
        </CardHeader>
        <CardContent>{renderCalendar()}</CardContent>
      </Card>

      {/* Upcoming Maintenance List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Scheduled Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      {event.property}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Assigned to: {event.assignedTo}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline">
                    {new Date(event.date).toLocaleDateString()}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEventDetailsOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <MaintenanceEventDetails
          event={selectedEvent}
          isOpen={isEventDetailsOpen}
          onClose={() => setIsEventDetailsOpen(false)}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

import MaintenanceEventDetails from "./MaintenanceEventDetails";

export default MaintenanceSchedule;
