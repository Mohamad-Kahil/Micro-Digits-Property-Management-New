import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Save, Upload, Calendar } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const maintenanceFormSchema = z.object({
  propertyId: z.string({
    required_error: "Please select a property",
  }),
  unitId: z.string({
    required_error: "Please select a unit",
  }),
  tenantId: z.string().optional(),
  requestType: z.string({
    required_error: "Please select a request type",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  priority: z.string({
    required_error: "Please select a priority level",
  }),
  assignedTo: z.string().optional(),
  assignedVendor: z.string().optional(),
  estimatedCompletion: z.string().optional(),
  estimatedCost: z.coerce.number().optional(),
  notes: z.string().optional(),
});

type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>;

interface MaintenanceFormProps {
  initialData?: MaintenanceFormValues;
  isEditing?: boolean;
}

const defaultValues: Partial<MaintenanceFormValues> = {
  propertyId: "",
  unitId: "",
  tenantId: "",
  requestType: "",
  description: "",
  priority: "medium",
  assignedTo: "",
  assignedVendor: "",
  estimatedCompletion: "",
  estimatedCost: 0,
  notes: "",
};

// Mock data for properties, units, tenants, etc.
const mockProperties = [
  { id: "prop-001", name: "Sunset Apartments" },
  { id: "prop-002", name: "Parkview Residences" },
  { id: "prop-003", name: "Highland Towers" },
  { id: "prop-004", name: "Riverside Condos" },
];

const mockUnits = {
  "prop-001": [
    { id: "unit-101", name: "Apt 101" },
    { id: "unit-102", name: "Apt 102" },
    { id: "unit-201", name: "Apt 201" },
    { id: "unit-202", name: "Apt 202" },
  ],
  "prop-002": [
    { id: "unit-1a", name: "Unit 1A" },
    { id: "unit-1b", name: "Unit 1B" },
    { id: "unit-2a", name: "Unit 2A" },
    { id: "unit-2b", name: "Unit 2B" },
  ],
};

const mockTenants = {
  "unit-101": { id: "tenant-001", name: "Sarah Johnson" },
  "unit-102": { id: "tenant-002", name: "Michael Chen" },
  "unit-201": { id: "tenant-003", name: "Emily Rodriguez" },
  "unit-1a": { id: "tenant-004", name: "David Wilson" },
  "unit-1b": { id: "tenant-005", name: "Jessica Taylor" },
};

const mockStaff = [
  { id: "staff-001", name: "John Smith" },
  { id: "staff-002", name: "Maria Garcia" },
  { id: "staff-003", name: "Robert Johnson" },
  { id: "staff-004", name: "Mike Davis" },
];

const mockVendors = [
  { id: "vendor-001", name: "Electric Experts LLC" },
  { id: "vendor-002", name: "Plumbing Pros" },
  { id: "vendor-003", name: "HVAC Solutions" },
  { id: "vendor-004", name: "Pest Solutions Inc." },
];

const mockRequestTypes = [
  { id: "plumbing", name: "Plumbing" },
  { id: "electrical", name: "Electrical" },
  { id: "hvac", name: "HVAC" },
  { id: "appliance", name: "Appliance" },
  { id: "structural", name: "Structural" },
  { id: "pest", name: "Pest Control" },
  { id: "other", name: "Other" },
];

const MaintenanceForm = ({ isEditing = false }: MaintenanceFormProps) => {
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [availableUnits, setAvailableUnits] = useState<
    { id: string; name: string }[]
  >([]);
  const [tenant, setTenant] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [images, setImages] = useState<string[]>([]);

  // In a real app, you would fetch the request data based on the ID if editing
  const initialData = isEditing
    ? {
        propertyId: "prop-002",
        unitId: "unit-1b",
        tenantId: "tenant-005",
        requestType: "electrical",
        description:
          "Power outlet not working in living room. I've tried resetting the breaker but it didn't help. The outlet is located on the north wall behind the couch.",
        priority: "high",
        assignedTo: "staff-001",
        assignedVendor: "vendor-001",
        estimatedCompletion: "2023-06-18",
        estimatedCost: 150,
        notes:
          "Technician will need access to the breaker panel. Tenant has been notified to be available between 9am-12pm on 6/18.",
      }
    : defaultValues;

  const form = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues: initialData,
  });

  // Initialize form state if editing
  React.useEffect(() => {
    if (isEditing && initialData) {
      // Set selected property and load units
      setSelectedProperty(initialData.propertyId);
      setAvailableUnits(mockUnits[initialData.propertyId] || []);

      // Set selected unit and load tenant
      setSelectedUnit(initialData.unitId);
      setTenant(mockTenants[initialData.unitId] || null);

      // Set mock images for editing example
      setImages([
        "https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=500&q=80",
        "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?w=500&q=80",
      ]);
    }
  }, [isEditing, initialData]);

  const onSubmit = (data: MaintenanceFormValues) => {
    console.log(data);
    // In a real app, you would save the data to your backend
    navigate("/maintenance/requests");
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setAvailableUnits(mockUnits[propertyId] || []);
    form.setValue("propertyId", propertyId);
    form.setValue("unitId", ""); // Reset unit when property changes
    setSelectedUnit("");
    setTenant(null);
  };

  const handleUnitChange = (unitId: string) => {
    setSelectedUnit(unitId);
    form.setValue("unitId", unitId);
    const unitTenant = mockTenants[unitId];
    setTenant(unitTenant || null);
    if (unitTenant) {
      form.setValue("tenantId", unitTenant.id);
    } else {
      form.setValue("tenantId", "");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 mr-2"
          onClick={() => navigate("/maintenance/requests")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Maintenance Request" : "New Maintenance Request"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property and Unit Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Property & Unit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property</FormLabel>
                        <Select
                          onValueChange={(value) => handlePropertyChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockProperties.map((property) => (
                              <SelectItem key={property.id} value={property.id}>
                                {property.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unitId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select
                          onValueChange={(value) => handleUnitChange(value)}
                          defaultValue={field.value}
                          disabled={!selectedProperty}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableUnits.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>
                                {unit.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {tenant && (
                  <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-medium mb-2">Tenant Information</h3>
                    <p>{tenant.name}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Request Type and Priority */}
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="requestType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select request type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockRequestTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Request Description */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Request Description</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the maintenance issue in detail..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide as much detail as possible about the
                        issue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Assignment Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Assignment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="assignedTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign To Staff</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select staff member" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Unassigned</SelectItem>
                            {mockStaff.map((staff) => (
                              <SelectItem key={staff.id} value={staff.id}>
                                {staff.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assignedVendor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vendor</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vendor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {mockVendors.map((vendor) => (
                              <SelectItem key={vendor.id} value={vendor.id}>
                                {vendor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="estimatedCompletion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Completion Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input type="date" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimatedCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Cost ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional notes or instructions..."
                          className="min-h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {images.length > 0 ? (
                    <div className="space-y-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="rounded-md overflow-hidden border"
                        >
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 border border-dashed rounded-md">
                      <p className="text-muted-foreground mb-4">
                        No images uploaded
                      </p>
                    </div>
                  )}
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Images
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/maintenance/requests")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Request" : "Create Request"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MaintenanceForm;
