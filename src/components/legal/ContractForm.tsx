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
import {
  ChevronLeft,
  Save,
  Upload,
  Calendar,
  DollarSign,
  Users,
  Building,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contractFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, { message: "Title must be at least 3 characters" }),
  type: z.string({
    required_error: "Contract type is required",
  }),
  startDate: z.string({
    required_error: "Start date is required",
  }),
  endDate: z.string({
    required_error: "End date is required",
  }),
  parties: z
    .array(z.string())
    .min(1, { message: "At least one party is required" }),
  value: z.coerce.number().optional(),
  propertyId: z.string().optional(),
  description: z.string().optional(),
  file: z.any().optional(),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

interface ContractFormProps {
  initialData?: ContractFormValues;
  isEditing?: boolean;
}

const defaultValues: Partial<ContractFormValues> = {
  title: "",
  type: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split("T")[0],
  parties: ["Micro Digits Property Management", ""],
  value: undefined,
  propertyId: "",
  description: "",
};

// Mock data for properties
const mockProperties = [
  { id: "prop-001", name: "Sunset Apartments" },
  { id: "prop-002", name: "Parkview Residences" },
  { id: "prop-003", name: "Highland Towers" },
  { id: "prop-004", name: "Riverside Condos" },
  { id: "prop-all", name: "All Properties" },
];

// Mock data for contract types
const mockContractTypes = [
  { id: "lease", name: "Lease Agreement" },
  { id: "vendor", name: "Vendor Agreement" },
  { id: "employment", name: "Employment Contract" },
  { id: "insurance", name: "Insurance Policy" },
  { id: "service", name: "Service Agreement" },
  { id: "other", name: "Other" },
];

const ContractForm = ({ isEditing = false }: ContractFormProps) => {
  const navigate = useNavigate();
  const { contractId } = useParams<{ contractId: string }>();
  const [parties, setParties] = useState<string[]>([
    "Micro Digits Property Management",
    "",
  ]);

  // In a real app, you would fetch the contract data based on the ID if editing
  const initialData = isEditing
    ? {
        title: "Maintenance Service Agreement",
        type: "service",
        startDate: "2023-03-01",
        endDate: "2023-08-31",
        parties: ["Micro Digits Property Management", "Maintenance Pros Inc."],
        value: 24000,
        propertyId: "prop-all",
        description: "Quarterly maintenance services for all properties.",
      }
    : defaultValues;

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: ContractFormValues) => {
    console.log(data);
    // In a real app, you would save the data to your backend
    navigate("/legal/contracts");
  };

  const addParty = () => {
    const newParties = [...parties, ""];
    setParties(newParties);
    form.setValue("parties", newParties);
  };

  const removeParty = (index: number) => {
    if (parties.length <= 2) return; // Keep at least 2 parties
    const newParties = parties.filter((_, i) => i !== index);
    setParties(newParties);
    form.setValue("parties", newParties);
  };

  const updateParty = (index: number, value: string) => {
    const newParties = [...parties];
    newParties[index] = value;
    setParties(newParties);
    form.setValue("parties", newParties);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 mr-2"
          onClick={() => navigate("/legal/contracts")}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Contract" : "New Contract"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Lease Agreement" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contract type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockContractTypes.map((type) => (
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
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Value ($)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Total value of the contract (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Dates and Property */}
            <Card>
              <CardHeader>
                <CardTitle>Dates & Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
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
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
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
                </div>

                <FormField
                  control={form.control}
                  name="propertyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Property</FormLabel>
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
                        Property related to this contract (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Parties */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Contract Parties</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParty}
                >
                  Add Party
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parties.map((party, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          className="pl-10"
                          placeholder={`Party ${index + 1}`}
                          value={party}
                          onChange={(e) => updateParty(index, e.target.value)}
                          disabled={index === 0} // First party is always the company
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeParty(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description & Details</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter details about this contract..."
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
            <Card>
              <CardHeader>
                <CardTitle>Contract Document</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="contract-file">Upload Contract</Label>
                    <Input id="contract-file" type="file" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload the signed contract document (PDF, DOC, DOCX)
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
              onClick={() => navigate("/legal/contracts")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Contract" : "Save Contract"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContractForm;
