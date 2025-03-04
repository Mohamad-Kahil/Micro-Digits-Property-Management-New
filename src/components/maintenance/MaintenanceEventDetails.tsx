import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Trash2,
  Edit,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaintenanceEvent {
  id: string;
  title: string;
  date: string;
  property: string;
  assignedTo: string;
  description?: string;
  status?: "scheduled" | "in-progress" | "completed" | "cancelled";
}

interface MaintenanceEventDetailsProps {
  event: MaintenanceEvent;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (event: MaintenanceEvent) => void;
}

const MaintenanceEventDetails = ({
  event,
  isOpen,
  onClose,
  onDelete,
  onUpdate,
}: MaintenanceEventDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<MaintenanceEvent>(event);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = () => {
    setEditedEvent(event);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedEvent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(event.id);
      onClose();
    } else {
      setConfirmDelete(true);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
        );
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {!isEditing ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl">{event.title}</DialogTitle>
                {event.status && getStatusBadge(event.status)}
              </div>
              <DialogDescription>Maintenance event details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Date: {new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Property: {event.property}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span>Assigned to: {event.assignedTo}</span>
              </div>
              {event.description && (
                <div className="mt-2">
                  <Label className="text-muted-foreground mb-1 block">
                    Description
                  </Label>
                  <div className="p-3 bg-muted/20 rounded-md">
                    {event.description}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <div>
                <Button variant="destructive" onClick={handleDelete}>
                  {confirmDelete ? "Confirm Delete" : "Delete"}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Edit Maintenance Event</DialogTitle>
              <DialogDescription>
                Update the details of this maintenance event
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editedEvent.title}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={editedEvent.date}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, date: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="property">Property</Label>
                <Select
                  value={editedEvent.property}
                  onValueChange={(value) =>
                    setEditedEvent({ ...editedEvent, property: value })
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
                  value={editedEvent.assignedTo}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      assignedTo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedEvent.status || "scheduled"}
                  onValueChange={(value: any) =>
                    setEditedEvent({ ...editedEvent, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedEvent.description || ""}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      description: e.target.value,
                    })
                  }
                  placeholder="Details about the maintenance activity"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceEventDetails;
