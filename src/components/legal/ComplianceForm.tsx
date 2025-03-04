import React from "react";
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
import {
  ChevronLeft,
  Save,
  Calendar,
  Building,
  User,
  Scale,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const complianceFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, { message: "Title must be at least 3 characters" }),
  category: z.string({
    required_error: "Category is required",
  }),
  dueDate: z.string({
    required_error: "Due date is required",
  }),
  status: z.string({
    required_error: "Status is required",
  }),
  propertyId: z.string().optional(),
  assignedTo: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

type ComplianceFormValues = z.infer<typeof complianceFormSchema>;

interface ComplianceFormProps {
  initialData?: ComplianceFormValues;
  isEditing?: boolean;
}

const defaultValues: Partial<ComplianceFormValues> = {
  title: "",
  category: "",
  dueDate: new Date().toISOString().split("T")[0],
  status: "pending",
  propertyId: "",
  assignedTo: "",
  description: "",
  notes: "",
};

// Mock data for properties
const mockProperties = [
  { id: "prop-001", name: "Sunset Apartments" },
  { id: "prop-002", name: "Parkview Residences" },
  { id: "prop-003", name: "Highland Towers" },
  { id: "prop-004", name: "Riverside Condos" },
  { id: "prop-all", name: "All Properties" },
];

// Mock data for staff members
const mockStaff = [
  { id: "staff-001", name: "John Smith" },
  { id: "staff-002", name: "Maria Garcia" },
  { id: "staff-003", name: "Robert Johnson" },
  { id: "staff-004", name: "Finance Department" },
  { id: "staff-005", name: "Maintenance Department" },
  { id: "staff-006", name: "Legal Department" },
  { id: "staff-007", name: "Property Manager" },
];

// Mock data for categories
const mockCategories = [
  { id: "safety", name: "Safety" },
  { id: "tax", name: "Tax" },
  { id: "accessibility", name: "Accessibility" },
  { id: "insurance", name: "Insurance" },
  { id: "disclosure", name: "Disclosure" },
  { id: "maintenance", name: "Maintenance" },
  { id: "training", name: "Training" },
];

const ComplianceForm = ({ isEditing = false }: ComplianceFormProps) => {
  const navigate = useNavigate();
  const { complianceId } = useParams<{ complianceId: string }>();

  // In a real app, you would fetch the compliance item data based on the ID if editing
  const initialData = isEditing
    ? {
        title: "Annual Fire Safety Inspection",
        category: "safety",
        dueDate: "2023-08-15",
        status: "pending",
        propertyId: "prop-all",
        assignedTo: "staff-001",
        description:
          "Annual fire safety inspection required by local regulations.",
        notes:
          "Contact Fire Safety Pros Inc. to schedule the inspection at least 2 weeks in advance.",
      }
    : defaultValues;

  const form = useForm<ComplianceFormValues>({
    resolver: zodResolver(complianceFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: ComplianceFormValues) => {
    console.log(data);
    // In a real app, you would save the data to your backend
    navigate("/legal/compliance");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 mr-2"
          onClick={() => navigate("/legal/compliance")}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Compliance Item" : "New Compliance Item"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Annual Fire Safety Inspection"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
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
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="propertyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {mockProperties.map((property) => (
                            <SelectItem key={property.id} value={property.id}>
                              {property.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Property related to this compliance item
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned To</FormLabel>
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
                      <FormDescription>
                        Person or department responsible for this item
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter details about this compliance requirement..."
                          className="min-h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
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

            {/* File Upload */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="compliance-file">
                      Upload Documentation
                    </Label>
                    <Input id="compliance-file" type="file" multiple />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload any relevant documentation (PDF, DOC, DOCX, JPG, PNG)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/legal/compliance")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Item" : "Save Item"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

import { Label } from "@/components/ui/label";

export default ComplianceForm;
