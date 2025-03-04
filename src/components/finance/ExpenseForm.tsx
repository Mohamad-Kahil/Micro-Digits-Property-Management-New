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
import { ChevronLeft, Save, Upload, Calendar, CreditCard } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const expenseFormSchema = z.object({
  date: z.string({
    required_error: "Date is required",
  }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(3, { message: "Description must be at least 3 characters" }),
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(0.01, { message: "Amount must be greater than 0" }),
  category: z.string({
    required_error: "Category is required",
  }),
  propertyId: z.string().optional(),
  unitId: z.string().optional(),
  vendorId: z.string().optional(),
  paymentMethod: z.string({
    required_error: "Payment method is required",
  }),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

interface ExpenseFormProps {
  initialData?: ExpenseFormValues;
  isEditing?: boolean;
}

const defaultValues: Partial<ExpenseFormValues> = {
  date: new Date().toISOString().split("T")[0],
  description: "",
  amount: 0,
  category: "",
  propertyId: "",
  unitId: "",
  vendorId: "",
  paymentMethod: "",
  reference: "",
  notes: "",
};

// Mock data for properties, units, vendors, etc.
const mockProperties = [
  { id: "prop-001", name: "Sunset Apartments" },
  { id: "prop-002", name: "Parkview Residences" },
  { id: "prop-003", name: "Highland Towers" },
  { id: "prop-004", name: "Riverside Condos" },
  { id: "prop-all", name: "All Properties" },
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

const mockVendors = [
  { id: "vendor-001", name: "Electric Experts LLC" },
  { id: "vendor-002", name: "Plumbing Pros" },
  { id: "vendor-003", name: "HVAC Solutions" },
  { id: "vendor-004", name: "Pest Solutions Inc." },
  { id: "vendor-005", name: "Green Thumb Services" },
  { id: "vendor-006", name: "SafeGuard Insurance" },
  { id: "vendor-007", name: "City Water Services" },
];

const mockCategories = [
  { id: "cat-001", name: "Maintenance" },
  { id: "cat-002", name: "Utilities" },
  { id: "cat-003", name: "Insurance" },
  { id: "cat-004", name: "Property Tax" },
  { id: "cat-005", name: "Management" },
  { id: "cat-006", name: "Repairs" },
  { id: "cat-007", name: "Other" },
];

const mockPaymentMethods = [
  { id: "payment-001", name: "Credit Card" },
  { id: "payment-002", name: "Bank Transfer" },
  { id: "payment-003", name: "Cash" },
  { id: "payment-004", name: "Check" },
  { id: "payment-005", name: "Other" },
];

export default function ExpenseForm({ isEditing = false }: ExpenseFormProps) {
  const navigate = useNavigate();
  const { expenseId } = useParams<{ expenseId: string }>();
  const [selectedProperty, setSelectedProperty] = useState<string>("");

  // In a real app, you would fetch the expense data based on the ID if editing
  const initialData = isEditing
    ? {
        date: "2023-06-15",
        description: "Plumbing Repair - Unit 103",
        amount: 350,
        category: "cat-001",
        propertyId: "prop-002",
        unitId: "unit-1b",
        vendorId: "vendor-002",
        paymentMethod: "payment-001",
        reference: "INV789012",
        notes: "Emergency repair for leaking pipe.",
      }
    : defaultValues;

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: ExpenseFormValues) => {
    console.log(data);
    // In a real app, you would save the data to your backend
    navigate("/finance/expenses");
  };

  // Get available units based on selected property
  const availableUnits =
    selectedProperty && mockUnits[selectedProperty]
      ? mockUnits[selectedProperty]
      : [];

  // Update available units when property changes
  React.useEffect(() => {
    const propertyId = form.watch("propertyId");
    if (propertyId && propertyId !== selectedProperty) {
      setSelectedProperty(propertyId);
      // Reset unit selection if property changes
      if (propertyId === "prop-all" || !mockUnits[propertyId]) {
        form.setValue("unitId", "");
      }
    }
  }, [form.watch("propertyId"), form, selectedProperty]);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 mr-2"
          onClick={() => navigate("/finance/expenses")}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Expense" : "Record Expense"}
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
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Plumbing Repair" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
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
              </CardContent>
            </Card>

            {/* Property & Vendor Information */}
            <Card>
              <CardHeader>
                <CardTitle>Property & Vendor</CardTitle>
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

                {selectedProperty &&
                  selectedProperty !== "prop-all" &&
                  availableUnits.length > 0 && (
                    <FormField
                      control={form.control}
                      name="unitId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">None</SelectItem>
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
                  )}

                <FormField
                  control={form.control}
                  name="vendorId"
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
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockPaymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id}>
                              {method.name}
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
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            className="pl-10"
                            placeholder="e.g. Invoice or Receipt #"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional notes about this expense..."
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
          </div>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/finance/expenses")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Expense" : "Save Expense"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
