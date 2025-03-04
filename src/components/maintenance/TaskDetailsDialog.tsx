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
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreventiveTask {
  id: string;
  title: string;
  property: string;
  category: string;
  frequency: "weekly" | "monthly" | "quarterly" | "biannually" | "annually";
  lastCompleted?: string;
  nextDue: string;
  assignedTo?: string;
  status: "upcoming" | "due" | "overdue" | "completed";
  description?: string;
}

interface TaskDetailsDialogProps {
  task: PreventiveTask;
  isOpen: boolean;
  onClose: () => void;
  onMarkCompleted: (id: string) => void;
  onReschedule: (id: string, newDate: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: PreventiveTask) => void;
}

const TaskDetailsDialog = ({
  task,
  isOpen,
  onClose,
  onMarkCompleted,
  onReschedule,
  onDelete,
  onUpdate,
}: TaskDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDueDate, setNewDueDate] = useState(task.nextDue);
  const [editedTask, setEditedTask] = useState<PreventiveTask>(task);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = () => {
    setEditedTask(task);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleReschedule = () => {
    if (isRescheduling) {
      onReschedule(task.id, newDueDate);
      setIsRescheduling(false);
    } else {
      setNewDueDate(task.nextDue);
      setIsRescheduling(true);
    }
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(task.id);
      onClose();
    } else {
      setConfirmDelete(true);
    }
  };

  const getStatusBadge = (status: PreventiveTask["status"]) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case "due":
        return <Badge className="bg-amber-100 text-amber-800">Due</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: PreventiveTask["status"]) => {
    switch (status) {
      case "upcoming":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "due":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getFrequencyText = (frequency: PreventiveTask["frequency"]) => {
    switch (frequency) {
      case "weekly":
        return "Weekly";
      case "monthly":
        return "Monthly";
      case "quarterly":
        return "Quarterly";
      case "biannually":
        return "Bi-annually";
      case "annually":
        return "Annually";
      default:
        return frequency;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {!isEditing ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl">{task.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  {getStatusBadge(task.status)}
                </div>
              </div>
              <DialogDescription>
                Preventive maintenance task details
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Property
                  </Label>
                  <div className="font-medium">{task.property}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Category
                  </Label>
                  <div className="font-medium">{task.category}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Frequency
                  </Label>
                  <div className="font-medium">
                    {getFrequencyText(task.frequency)}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Next Due Date
                  </Label>
                  <div className="font-medium">
                    {new Date(task.nextDue).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {task.lastCompleted && (
                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Last Completed
                  </Label>
                  <div className="font-medium">
                    {new Date(task.lastCompleted).toLocaleDateString()}
                  </div>
                </div>
              )}
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  Assigned To
                </Label>
                <div className="font-medium">
                  {task.assignedTo || "Unassigned"}
                </div>
              </div>
              {task.description && (
                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Description
                  </Label>
                  <div className="p-3 bg-muted/20 rounded-md">
                    {task.description}
                  </div>
                </div>
              )}
              {isRescheduling && (
                <div className="mt-4 p-4 border rounded-md bg-muted/10">
                  <Label htmlFor="newDueDate">New Due Date</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="newDueDate"
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                    />
                    <Button onClick={handleReschedule}>Confirm</Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsRescheduling(false)}
                    >
                      Cancel
                    </Button>
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
                {task.status !== "completed" && (
                  <Button
                    variant="outline"
                    onClick={() => onMarkCompleted(task.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Mark Completed
                  </Button>
                )}
                {!isRescheduling && task.status !== "completed" && (
                  <Button variant="outline" onClick={handleReschedule}>
                    <Calendar className="mr-2 h-4 w-4" /> Reschedule
                  </Button>
                )}
                <Button onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update the details of this preventive maintenance task
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={editedTask.title}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={editedTask.category}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, category: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="property">Property</Label>
                  <Select
                    value={editedTask.property}
                    onValueChange={(value) =>
                      setEditedTask({ ...editedTask, property: value })
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
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={editedTask.frequency}
                    onValueChange={(value: any) =>
                      setEditedTask({ ...editedTask, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="biannually">Bi-annually</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nextDue">Next Due Date</Label>
                  <Input
                    id="nextDue"
                    type="date"
                    value={editedTask.nextDue}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, nextDue: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={editedTask.assignedTo || ""}
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        assignedTo: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedTask.status}
                  onValueChange={(value: any) =>
                    setEditedTask({ ...editedTask, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="due">Due</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedTask.description || ""}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
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

export default TaskDetailsDialog;
