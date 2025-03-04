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
  Phone,
  Mail,
  Building,
  Star,
  Edit,
  Trash2,
  FileText,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Vendor {
  id: string;
  name: string;
  category: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  activeContracts: number;
  lastUsed?: string;
  notes?: string;
}

interface VendorDetailsDialogProps {
  vendor: Vendor;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (vendor: Vendor) => void;
  onDelete: (id: string) => void;
}

const VendorDetailsDialog = ({
  vendor,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: VendorDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVendor, setEditedVendor] = useState<Vendor>(vendor);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Mock data for contracts and service history
  const mockContracts = [
    {
      id: "contract-1",
      title: "Annual HVAC Maintenance",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      value: 12000,
    },
    {
      id: "contract-2",
      title: "Emergency Repair Services",
      startDate: "2023-03-01",
      endDate: "2024-02-29",
      value: 5000,
    },
  ];

  const mockServiceHistory = [
    {
      id: "service-1",
      date: "2023-06-15",
      property: "Sunset Apartments",
      description: "HVAC system repair in unit 301",
      cost: 350,
    },
    {
      id: "service-2",
      date: "2023-05-22",
      property: "Parkview Residences",
      description: "Quarterly maintenance check",
      cost: 800,
    },
    {
      id: "service-3",
      date: "2023-04-10",
      property: "Highland Towers",
      description: "Emergency repair call",
      cost: 450,
    },
  ];

  const handleEdit = () => {
    setEditedVendor(vendor);
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedVendor);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(vendor.id);
      onClose();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        {!isEditing ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl">{vendor.name}</DialogTitle>
                <Badge variant="outline">{vendor.category}</Badge>
              </div>
              <DialogDescription>
                Vendor details and service history
              </DialogDescription>
            </DialogHeader>

            <Tabs
              defaultValue="details"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="history">Service History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{vendor.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                      <span>{vendor.rating.toFixed(1)} rating</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Contact Person
                    </Label>
                    <div className="font-medium">{vendor.contactName}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Category
                    </Label>
                    <div className="font-medium">{vendor.category}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Contact Information
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{vendor.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Address
                  </Label>
                  <div className="font-medium">{vendor.address}</div>
                </div>

                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Active Contracts
                  </Label>
                  <div className="font-medium">{vendor.activeContracts}</div>
                </div>

                {vendor.lastUsed && (
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Last Used
                    </Label>
                    <div className="font-medium">
                      {new Date(vendor.lastUsed).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {vendor.notes && (
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Notes
                    </Label>
                    <div className="p-3 bg-muted/20 rounded-md">
                      {vendor.notes}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="contracts" className="space-y-4 mt-4">
                {mockContracts.length > 0 ? (
                  <div className="space-y-4">
                    {mockContracts.map((contract) => (
                      <div
                        key={contract.id}
                        className="p-4 border rounded-md hover:bg-muted/50"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{contract.title}</h3>
                          <Badge variant="outline">
                            ${contract.value.toLocaleString()}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(contract.startDate).toLocaleDateString()} -{" "}
                          {new Date(contract.endDate).toLocaleDateString()}
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="mr-2 h-4 w-4" /> View Contract
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No active contracts
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      There are no active contracts with this vendor.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                {mockServiceHistory.length > 0 ? (
                  <div className="space-y-4">
                    {mockServiceHistory.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 border rounded-md hover:bg-muted/50"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{service.property}</h3>
                          <Badge variant="outline">
                            ${service.cost.toLocaleString()}
                          </Badge>
                        </div>
                        <div className="text-sm mt-1">
                          {service.description}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(service.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wrench className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No service history
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      There is no service history for this vendor yet.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between sm:justify-between mt-4">
              <div>
                <Button variant="destructive" onClick={handleDelete}>
                  {confirmDelete ? "Confirm Delete" : "Delete"}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(`mailto:${vendor.email}`, "_blank")
                  }
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact
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
              <DialogTitle>Edit Vendor</DialogTitle>
              <DialogDescription>
                Update the details of this vendor
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Vendor Name</Label>
                  <Input
                    id="name"
                    value={editedVendor.name}
                    onChange={(e) =>
                      setEditedVendor({ ...editedVendor, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={editedVendor.category}
                    onChange={(e) =>
                      setEditedVendor({
                        ...editedVendor,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactName">Contact Person</Label>
                  <Input
                    id="contactName"
                    value={editedVendor.contactName}
                    onChange={(e) =>
                      setEditedVendor({
                        ...editedVendor,
                        contactName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editedVendor.phone}
                    onChange={(e) =>
                      setEditedVendor({
                        ...editedVendor,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedVendor.email}
                  onChange={(e) =>
                    setEditedVendor({ ...editedVendor, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editedVendor.address}
                  onChange={(e) =>
                    setEditedVendor({
                      ...editedVendor,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={editedVendor.rating}
                    onChange={(e) =>
                      setEditedVendor({
                        ...editedVendor,
                        rating: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="activeContracts">Active Contracts</Label>
                  <Input
                    id="activeContracts"
                    type="number"
                    min="0"
                    value={editedVendor.activeContracts}
                    onChange={(e) =>
                      setEditedVendor({
                        ...editedVendor,
                        activeContracts: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editedVendor.notes || ""}
                  onChange={(e) =>
                    setEditedVendor({ ...editedVendor, notes: e.target.value })
                  }
                  placeholder="Additional information about this vendor"
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

export default VendorDetailsDialog;
