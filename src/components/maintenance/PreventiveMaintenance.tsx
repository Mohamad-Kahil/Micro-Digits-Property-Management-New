import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  FileText,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

const mockTasks: PreventiveTask[] = [
  {
    id: "pm-001",
    title: "HVAC Filter Replacement",
    property: "Sunset Apartments",
    category: "HVAC",
    frequency: "quarterly",
    lastCompleted: "2023-03-15",
    nextDue: "2023-06-15",
    assignedTo: "John Smith",
    status: "due",
    description:
      "Replace air filters in all units. Check for any issues with the HVAC systems.",
  },
  {
    id: "pm-002",
    title: "Roof Inspection",
    property: "Parkview Residences",
    category: "Structural",
    frequency: "biannually",
    lastCompleted: "2022-12-10",
    nextDue: "2023-06-10",
    assignedTo: "Roofing Experts Inc.",
    status: "overdue",
    description:
      "Inspect roof for damage, leaks, or wear. Clean gutters and downspouts.",
  },
  {
    id: "pm-003",
    title: "Fire Alarm Testing",
    property: "Highland Towers",
    category: "Safety",
    frequency: "quarterly",
    lastCompleted: "2023-03-22",
    nextDue: "2023-06-22",
    assignedTo: "Safety First Inc.",
    status: "upcoming",
    description:
      "Test all fire alarms, sprinklers, and emergency lighting systems.",
  },
  {
    id: "pm-004",
    title: "Elevator Maintenance",
    property: "Riverside Condos",
    category: "Mechanical",
    frequency: "monthly",
    lastCompleted: "2023-05-25",
    nextDue: "2023-06-25",
    assignedTo: "Elevator Tech Co.",
    status: "upcoming",
    description:
      "Inspect and maintain elevator systems, check safety features and operation.",
  },
  {
    id: "pm-005",
    title: "Landscaping and Grounds",
    property: "Sunset Apartments",
    category: "Exterior",
    frequency: "monthly",
    lastCompleted: "2023-05-28",
    nextDue: "2023-06-28",
    assignedTo: "Green Thumb Services",
    status: "upcoming",
    description:
      "Lawn maintenance, tree trimming, and general landscaping upkeep.",
  },
  {
    id: "pm-006",
    title: "Plumbing System Inspection",
    property: "Parkview Residences",
    category: "Plumbing",
    frequency: "quarterly",
    lastCompleted: "2023-03-05",
    nextDue: "2023-06-05",
    status: "overdue",
    description:
      "Check for leaks, inspect water heaters, and test water pressure in common areas.",
  },
  {
    id: "pm-007",
    title: "Pest Control Treatment",
    property: "Highland Towers",
    category: "Pest Control",
    frequency: "quarterly",
    lastCompleted: "2023-04-10",
    nextDue: "2023-07-10",
    assignedTo: "Pest Solutions Inc.",
    status: "upcoming",
    description:
      "Preventive pest control treatment for common areas and building exterior.",
  },
];

const PreventiveMaintenance = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    property: "",
    category: "",
    frequency: "monthly",
    nextDue: new Date().toISOString().split("T")[0],
    assignedTo: "",
    description: "",
  });

  const handleAddTask = () => {
    console.log("Adding task:", newTask);
    setIsAddTaskOpen(false);
    // In a real app, you would save the task to your backend
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
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "due":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
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

  // Filter tasks based on search query and status filter
  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.assignedTo &&
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter ? task.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Count tasks by status
  const upcomingCount = mockTasks.filter(
    (task) => task.status === "upcoming",
  ).length;
  const dueCount = mockTasks.filter((task) => task.status === "due").length;
  const overdueCount = mockTasks.filter(
    (task) => task.status === "overdue",
  ).length;
  const completedCount = mockTasks.filter(
    (task) => task.status === "completed",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Preventive Maintenance
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage recurring maintenance tasks to prevent issues before they
            occur.
          </p>
        </div>
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Preventive Maintenance Task</DialogTitle>
              <DialogDescription>
                Create a new recurring maintenance task for your properties.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    placeholder="e.g. HVAC Filter Replacement"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    placeholder="e.g. HVAC, Plumbing, Electrical"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="property">Property</Label>
                  <Select
                    value={newTask.property}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, property: value })
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
                    value={newTask.frequency}
                    onValueChange={(value: any) =>
                      setNewTask({ ...newTask, frequency: value })
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
                    value={newTask.nextDue}
                    onChange={(e) =>
                      setNewTask({ ...newTask, nextDue: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={newTask.assignedTo}
                    onChange={(e) =>
                      setNewTask({ ...newTask, assignedTo: e.target.value })
                    }
                    placeholder="Staff member or vendor"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Detailed description of the maintenance task"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due Now</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{dueCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overdueCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter || ""}
          onValueChange={(value) => setStatusFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="due">Due</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Preventive Maintenance Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.property}</TableCell>
                    <TableCell>{task.category}</TableCell>
                    <TableCell>{getFrequencyText(task.frequency)}</TableCell>
                    <TableCell>
                      {new Date(task.nextDue).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {task.assignedTo || (
                        <span className="text-muted-foreground">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        {getStatusBadge(task.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as
                            Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" /> Reschedule
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreventiveMaintenance;
