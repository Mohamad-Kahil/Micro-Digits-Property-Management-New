import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  User,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Communication {
  id: string;
  date: string;
  type: "email" | "phone" | "in-person" | "sms";
  subject: string;
  summary: string;
  direction: "incoming" | "outgoing";
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  avatar: string;
  communications: Communication[];
}

const mockTenants: Record<string, Tenant> = {
  "tenant-001": {
    id: "tenant-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    property: "Sunset Apartments",
    unit: "Apt 301",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-johnson",
    communications: [
      {
        id: "comm-1",
        date: "2023-06-15",
        type: "email",
        subject: "Maintenance Request Follow-up",
        summary: "Followed up on the maintenance request for the kitchen sink.",
        direction: "outgoing",
      },
      {
        id: "comm-2",
        date: "2023-06-10",
        type: "phone",
        subject: "Lease Renewal Discussion",
        summary: "Discussed options for lease renewal starting in January.",
        direction: "incoming",
      },
      {
        id: "comm-3",
        date: "2023-05-22",
        type: "email",
        subject: "Building Maintenance Notice",
        summary:
          "Sent notice about upcoming water shut-off for building maintenance.",
        direction: "outgoing",
      },
      {
        id: "comm-4",
        date: "2023-05-15",
        type: "sms",
        subject: "Rent Payment Confirmation",
        summary: "Confirmed receipt of May rent payment.",
        direction: "outgoing",
      },
      {
        id: "comm-5",
        date: "2023-05-01",
        type: "email",
        subject: "Rent Payment Reminder",
        summary: "Sent friendly reminder that rent is due today.",
        direction: "outgoing",
      },
      {
        id: "comm-6",
        date: "2023-04-25",
        type: "in-person",
        subject: "Maintenance Request Discussion",
        summary: "Met to discuss the bathroom fan issue and scheduled repair.",
        direction: "incoming",
      },
      {
        id: "comm-7",
        date: "2023-04-15",
        type: "email",
        subject: "Maintenance Request Submission",
        summary: "Tenant submitted a request to fix the bathroom fan.",
        direction: "incoming",
      },
    ],
  },
  "tenant-002": {
    id: "tenant-002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    property: "Parkview Residences",
    unit: "Unit 12B",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-chen",
    communications: [
      {
        id: "comm-1",
        date: "2023-06-03",
        type: "email",
        subject: "Late Payment Reminder",
        summary: "Sent reminder about June rent payment being due.",
        direction: "outgoing",
      },
      {
        id: "comm-2",
        date: "2023-06-05",
        type: "phone",
        subject: "Payment Discussion",
        summary:
          "Tenant called to discuss late payment and promised to pay by June 5th.",
        direction: "incoming",
      },
      {
        id: "comm-3",
        date: "2023-05-10",
        type: "email",
        subject: "Maintenance Request Confirmation",
        summary:
          "Confirmed receipt of maintenance request for dishwasher issue.",
        direction: "outgoing",
      },
    ],
  },
};

const TenantCommunication = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    type: "email",
    subject: "",
    message: "",
  });

  // In a real app, you would fetch the tenant data based on the ID
  const tenant = tenantId ? mockTenants[tenantId] : null;

  if (!tenant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Tenant Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The tenant you're looking for doesn't exist.
          </p>
          <Button className="mt-4" onClick={() => navigate("/tenants")}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Tenants
          </Button>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: Communication["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "phone":
        return <Phone className="h-4 w-4 text-green-500" />;
      case "in-person":
        return <User className="h-4 w-4 text-purple-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getDirectionIcon = (direction: Communication["direction"]) => {
    return direction === "incoming" ? (
      <ArrowDownLeft className="h-4 w-4 text-blue-500" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-green-500" />
    );
  };

  const handleSendMessage = () => {
    console.log("Sending message:", newMessage);
    setIsNewMessageOpen(false);
    // In a real app, you would save the message to your backend
  };

  // Filter communications based on search query and type filter
  const filteredCommunications = tenant.communications.filter((comm) => {
    const matchesSearch =
      comm.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;

    const matchesType = typeFilter ? comm.type === typeFilter : true;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => navigate(`/tenants/${tenant.id}`)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Communication Log
            </h1>
          </div>
          <div className="flex items-center text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            {tenant.name} • <Mail className="h-4 w-4 mx-1" /> {tenant.email} •{" "}
            <Phone className="h-4 w-4 mx-1" /> {tenant.phone}
          </div>
        </div>
        <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Send New Message</DialogTitle>
              <DialogDescription>
                Create a new communication record with this tenant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newMessage.type}
                  onValueChange={(value) =>
                    setNewMessage({ ...newMessage, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, subject: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={newMessage.message}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, message: e.target.value })
                  }
                  className="col-span-3 min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSendMessage}>
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search communications..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={typeFilter || ""}
          onValueChange={(value) => setTypeFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone Call</SelectItem>
            <SelectItem value="in-person">In-Person</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Communication List */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Communication History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {filteredCommunications.length > 0 ? (
                filteredCommunications.map((comm, index) => (
                  <div key={comm.id} className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        comm.direction === "incoming"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}
                    >
                      {getDirectionIcon(comm.direction)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{comm.subject}</p>
                          <p className="text-sm">{comm.summary}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 text-xs font-normal"
                            >
                              {getTypeIcon(comm.type)}
                              <span>
                                {comm.type.charAt(0).toUpperCase() +
                                  comm.type.slice(1)}
                              </span>
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comm.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            comm.direction === "incoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {comm.direction === "incoming" ? "Received" : "Sent"}
                        </Badge>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">
                    No communications found
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {searchQuery || typeFilter
                      ? "Try adjusting your search or filter"
                      : "Start communicating with this tenant by clicking 'New Message'"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantCommunication;
