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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, UserPlus, Lock, Shield, X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

interface Permission {
  userId: string;
  accessLevel: "owner" | "editor" | "viewer" | "restricted";
}

interface PermissionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePermissions: (permissions: Permission[]) => void;
  itemType: "contract" | "document" | "folder";
  itemTitle: string;
  currentPermissions?: Permission[];
}

const mockUsers: User[] = [
  {
    id: "user-001",
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    department: "Legal",
  },
  {
    id: "user-002",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "Manager",
    department: "Finance",
  },
  {
    id: "user-003",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Staff",
    department: "Property Management",
  },
  {
    id: "user-004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Staff",
    department: "Legal",
  },
  {
    id: "user-005",
    name: "David Brown",
    email: "david@example.com",
    role: "Manager",
    department: "Operations",
  },
];

const PermissionsDialog = ({
  isOpen,
  onClose,
  onUpdatePermissions,
  itemType,
  itemTitle,
  currentPermissions = [
    { userId: "user-001", accessLevel: "owner" },
    { userId: "user-002", accessLevel: "viewer" },
  ],
}: PermissionsDialogProps) => {
  const [permissions, setPermissions] =
    useState<Permission[]>(currentPermissions);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] =
    useState<Permission["accessLevel"]>("viewer");
  const [searchQuery, setSearchQuery] = useState("");

  const availableUsers = mockUsers.filter(
    (user) => !permissions.some((p) => p.userId === user.id),
  );

  const filteredUsers = availableUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department &&
        user.department.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleAddUser = () => {
    if (selectedUser) {
      setPermissions([
        ...permissions,
        { userId: selectedUser, accessLevel: selectedAccessLevel },
      ]);
      setSelectedUser("");
      setSelectedAccessLevel("viewer");
    }
  };

  const handleRemoveUser = (userId: string) => {
    setPermissions(permissions.filter((p) => p.userId !== userId));
  };

  const handleChangeAccessLevel = (
    userId: string,
    accessLevel: Permission["accessLevel"],
  ) => {
    setPermissions(
      permissions.map((p) => (p.userId === userId ? { ...p, accessLevel } : p)),
    );
  };

  const handleSave = () => {
    onUpdatePermissions(permissions);
    onClose();
  };

  const getAccessLevelBadge = (accessLevel: Permission["accessLevel"]) => {
    switch (accessLevel) {
      case "owner":
        return <Badge className="bg-green-100 text-green-800">Owner</Badge>;
      case "editor":
        return <Badge className="bg-blue-100 text-blue-800">Editor</Badge>;
      case "viewer":
        return <Badge className="bg-purple-100 text-purple-800">Viewer</Badge>;
      case "restricted":
        return <Badge className="bg-gray-100 text-gray-800">Restricted</Badge>;
      default:
        return <Badge>{accessLevel}</Badge>;
    }
  };

  const getUserById = (userId: string) => {
    return mockUsers.find((user) => user.id === userId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Permissions</DialogTitle>
          <DialogDescription>
            Control who can access this {itemType}:{" "}
            <span className="font-medium">{itemTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Current Permissions */}
          <div className="space-y-2">
            <Label className="text-base">Current Access</Label>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {permissions.map((permission) => {
                const user = getUserById(permission.userId);
                if (!user) return null;

                return (
                  <div
                    key={permission.userId}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.email} • {user.department || user.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={permission.accessLevel}
                        onValueChange={(value) =>
                          handleChangeAccessLevel(
                            permission.userId,
                            value as Permission["accessLevel"],
                          )
                        }
                        disabled={
                          permission.accessLevel === "owner" &&
                          permissions.filter((p) => p.accessLevel === "owner")
                            .length === 1
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="restricted">Restricted</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveUser(permission.userId)}
                        disabled={
                          permission.accessLevel === "owner" &&
                          permissions.filter((p) => p.accessLevel === "owner")
                            .length === 1
                        }
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}

              {permissions.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No users have been granted access yet.
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Add New User */}
          <div className="space-y-4">
            <Label className="text-base">Add People</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, email, or department"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchQuery && filteredUsers.length > 0 && (
              <div className="border rounded-md max-h-[150px] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-2 hover:bg-muted/20 cursor-pointer ${selectedUser === user.id ? "bg-muted/20" : ""}`}
                    onClick={() => setSelectedUser(user.id)}
                  >
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.email} • {user.department || user.role}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && filteredUsers.length === 0 && (
              <div className="text-center py-2 text-muted-foreground">
                No matching users found.
              </div>
            )}

            {selectedUser && (
              <div className="flex items-center gap-2">
                <Select
                  value={selectedAccessLevel}
                  onValueChange={(value) =>
                    setSelectedAccessLevel(value as Permission["accessLevel"])
                  }
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddUser} type="button">
                  <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Access Levels Explanation */}
          <div className="space-y-2">
            <Label className="text-base">Access Levels</Label>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                {getAccessLevelBadge("owner")}
                <span>Full control, can manage permissions</span>
              </div>
              <div className="flex items-center gap-2">
                {getAccessLevelBadge("editor")}
                <span>Can view and edit content</span>
              </div>
              <div className="flex items-center gap-2">
                {getAccessLevelBadge("viewer")}
                <span>Can view content only</span>
              </div>
              <div className="flex items-center gap-2">
                {getAccessLevelBadge("restricted")}
                <span>Limited access to specific sections</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSave} type="button">
            <Shield className="mr-2 h-4 w-4" /> Save Permissions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
