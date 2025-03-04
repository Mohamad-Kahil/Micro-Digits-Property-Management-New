import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  X,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "contract" | "document" | "compliance" | "system";
  priority: "high" | "medium" | "low";
  date: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    title: "Contract Expiring Soon",
    message: "Maintenance Service Agreement expires in 15 days.",
    type: "contract",
    priority: "high",
    date: "2023-08-16",
    read: false,
    actionUrl: "/legal/contracts/contract-002",
  },
  {
    id: "notif-002",
    title: "Compliance Deadline Approaching",
    message: "Annual Fire Safety Inspection due in 7 days.",
    type: "compliance",
    priority: "high",
    date: "2023-08-15",
    read: false,
    actionUrl: "/legal/compliance/comp-001",
  },
  {
    id: "notif-003",
    title: "Document Updated",
    message: "Property Deed for Sunset Apartments was updated.",
    type: "document",
    priority: "medium",
    date: "2023-08-14",
    read: true,
    actionUrl: "/legal/documents/doc-001",
  },
  {
    id: "notif-004",
    title: "System Maintenance",
    message: "System will be down for maintenance on August 20, 2023.",
    type: "system",
    priority: "low",
    date: "2023-08-13",
    read: true,
  },
  {
    id: "notif-005",
    title: "Contract Renewed",
    message: "Insurance Policy has been renewed successfully.",
    type: "contract",
    priority: "medium",
    date: "2023-08-12",
    read: true,
    actionUrl: "/legal/contracts/contract-003",
  },
];

const NotificationCenter = ({
  notifications = mockNotifications,
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onClearAll = () => {},
}: NotificationCenterProps) => {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications(
      localNotifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    onMarkAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    setLocalNotifications(
      localNotifications.map((n) => ({ ...n, read: true })),
    );
    onMarkAllAsRead();
  };

  const handleClearAll = () => {
    setLocalNotifications([]);
    onClearAll();
  };

  const filteredNotifications = localNotifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="outline">{unreadCount} unread</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Stay updated on important events and deadlines.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="contract">Contracts</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border rounded-md ${!notification.read ? "bg-muted/20" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        {getPriorityIcon(notification.priority)}
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {notification.date}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMarkAsRead(notification.id)}
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {notification.actionUrl && (
                      <div className="mt-2">
                        <SheetClose asChild>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto"
                            onClick={() => {
                              if (!notification.read) {
                                handleMarkAsRead(notification.id);
                              }
                              // In a real app, you would use router.push or similar
                              window.location.href = notification.actionUrl;
                            }}
                            type="button"
                          >
                            View Details
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You're all caught up!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter className="flex-col sm:flex-row gap-2 sm:justify-between sm:space-x-0">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={!unreadCount}
              type="button"
            >
              Mark All Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              disabled={localNotifications.length === 0}
              type="button"
            >
              Clear All
            </Button>
          </div>
          <Button variant="ghost" size="sm" type="button">
            <Settings className="h-4 w-4 mr-2" /> Notification Settings
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationCenter;
