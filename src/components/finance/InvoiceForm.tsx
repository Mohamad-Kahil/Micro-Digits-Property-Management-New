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
import { ChevronLeft, Save, Plus, Trash2, Calendar } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

const invoiceFormSchema = z.object({
  clientId: z.string({
    required_error: "Please select a client",
  }),
  invoiceNumber: z.string({
    required_error: "Invoice number is required",
  }),
  date: z.string({
    required_error: "Date is required",
  }),
  dueDate: z.string({
    required_error: "Due date is required",
  }),
  description: z.string().optional(),
  items: z
    .array(
      z.object({
        description: z.string(),
        quantity: z.coerce.number().min(1),
        unitPrice: z.coerce.number().min(0),
      }),
    )
    .min(1, { message: "At least one item is required" }),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface InvoiceFormProps {
  initialData?: InvoiceFormValues;
  isEditing?: boolean;
}

const defaultValues: Partial<InvoiceFormValues> = {
  clientId: "",
  invoiceNumber: "",
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  description: "",
  items: [
    {
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ],
  notes: "",
};

// Mock data for clients
const mockClients = [
  { id: "client-001", name: "Sarah Johnson" },
  { id: "client-002", name: "Michael Chen" },
  { id: "client-003", name: "Emily Rodriguez" },
  { id: "client-004", name: "David Wilson" },
  { id: "client-005", name: "Jessica Taylor" },
];

const InvoiceForm = ({ isEditing = false }: InvoiceFormProps) => {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();

  // In a real app, you would fetch the invoice data based on the ID if editing
  const initialData = isEditing
    ? {
        clientId: "client-002",
        invoiceNumber: "INV-2023-002",
        date: "2023-06-01",
        dueDate: "2023-06-15",
        description: "Monthly rent for Unit 12B - June 2023",
        items: [
          {
            description: "Monthly Rent",
            quantity: 1,
            unitPrice: 1800,
          },
        ],
        notes: "Payment due by the 15th of the month.",
      }
    : defaultValues;

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: InvoiceFormValues) => {
    console.log(data);
    // In a real app, you would save the data to your backend
    navigate("/finance/invoices");
  };

  const calculateSubtotal = () => {
    const items = form.getValues("items") || [];
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 mr-2"
          onClick={() => navigate("/finance/invoices")}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Invoice" : "New Invoice"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Client Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockClients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. INV-2023-001" {...field} />
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
                          <Input
                            placeholder="e.g. Monthly Rent - June 2023"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Invoice Dates */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Date</FormLabel>
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
              </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Invoice Items</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      description: "",
                      quantity: 1,
                      unitPrice: 0,
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Monthly Rent"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-24">
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Qty</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-32">
                        <FormField
                          control={form.control}
                          name={`items.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit Price</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="0.00"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-32">
                        <FormItem>
                          <FormLabel>Total</FormLabel>
                          <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50">
                            $
                            {(
                              form.watch(`items.${index}.quantity`) *
                              form.watch(`items.${index}.unitPrice`)
                            ).toFixed(2)}
                          </div>
                        </FormItem>
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end mt-6">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Tax:</span>
                        <span>$0.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="md:col-span-3">
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
                          placeholder="Add any additional notes or payment instructions..."
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
              onClick={() => navigate("/finance/invoices")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InvoiceForm;
