import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
import { ChevronLeft, Save, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tenantFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  property: z.string({
    required_error: "Please select a property",
  }),
  unit: z.string({
    required_error: "Please select a unit",
  }),
  leaseStart: z.string().min(1, { message: "Lease start date is required" }),
  leaseEnd: z.string().min(1, { message: "Lease end date is required" }),
  rentAmount: z.coerce
    .number()
    .positive({ message: "Rent amount must be positive" }),
  securityDeposit: z.coerce
    .number()
    .positive({ message: "Security deposit must be positive" }),
  status: z.string({
    required_error: "Please select a status",
  }),
  notes: z.string().optional(),
});

type TenantFormValues = z.infer<typeof tenantFormSchema>;

interface TenantFormProps {
  initialData?: TenantFormValues;
  isEditing?: boolean;
}

const defaultValues: Partial<TenantFormValues> = {
  name: "",
  email: "",
  phone: "",
  property: "",
  unit: "",
  leaseStart: new Date().toISOString().split("T")[0],
  leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split("T")[0],
  rentAmount: 0,
  securityDeposit: 0,
  status: "pending",
  notes: "",
};

// Mock data for properties and units
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
  "prop-003": [
    { id: "unit-101", name: "Suite 101" },
    { id: "unit-102", name: "Suite 102" },
    { id: "unit-201", name: "Suite 201" },
    { id: "unit-202", name: "Suite 202" },
  ],
  "prop-004": [
    { id: "unit-1", name: "Unit 1" },
    { id: "unit-2", name: "Unit 2" },
    { id: "unit-3", name: "Unit 3" },
    { id: "unit-4", name: "Unit 4" },
  ],
};

const mockTenantData = {
  "tenant-001": {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    property: "prop-001",
    unit: "unit-101",
    leaseStart: "2023-01-15",
    leaseEnd: "2024-01-14",
    rentAmount: 1500,
    securityDeposit: 1500,
    status: "active",
    notes: "Excellent tenant. Has a small dog (approved pet).",
  },
};

const TenantForm = ({ isEditing = false }: TenantFormProps) => {
  const navigate = useNavigate();
  const { tenantId } = useParams<{ tenantId: string }>();
  const [selectedProperty, setSelectedProperty] = useState("");
  const [availableUnits, setAvailableUnits] = useState<
    { id: string; name: string }[]
  >([]);
  const [avatarPreview, setAvatarPreview] = useState("");

  // In a real app, you would fetch the tenant data based on the ID
  const initialData =
    isEditing && tenantId && mockTenantData[tenantId]
      ? mockTenantData[tenantId]
      : defaultValues;

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: TenantFormValues) => {
    console.log(data);
    // In a real app, you would save the data to your backend
    navigate("/tenants");
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setAvailableUnits(mockUnits[propertyId] || []);
    form.setValue("property", propertyId);
    form.setValue("unit", ""); // Reset unit when property changes
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 mr-2"
          onClick={() => navigate("/tenants")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Tenant" : "Add New Tenant"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tenant Information */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tenant name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter phone number"
                              {...field}
                            />
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
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any additional notes about the tenant"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Tenant Avatar */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Avatar</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={
                        avatarPreview ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=tenant"
                      }
                      alt="Tenant Avatar"
                    />
                    <AvatarFallback>TN</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Photo
                  </Button>
                  <FormDescription className="text-center text-xs">
                    Upload a profile picture for the tenant. PNG, JPG or GIF.
                    Max 2MB.
                  </FormDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lease Details */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Lease Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="property"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property</FormLabel>
                          <Select
                            onValueChange={handlePropertyChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockProperties.map((property) => (
                                <SelectItem
                                  key={property.id}
                                  value={property.id}
                                >
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
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="leaseStart"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lease Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leaseEnd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lease End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent ($)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="securityDeposit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit ($)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tenant Status</FormLabel>
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
                            <SelectItem value="pending">
                              Pending Move-in
                            </SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="notice">Notice Given</SelectItem>
                            <SelectItem value="past">Past Tenant</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Documents */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Lease Agreement
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload ID Document
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Other Document
                  </Button>
                  <FormDescription className="text-xs">
                    Upload tenant-related documents such as lease agreements, ID
                    documents, etc.
                  </FormDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/tenants")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Tenant" : "Create Tenant"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default TenantForm;
