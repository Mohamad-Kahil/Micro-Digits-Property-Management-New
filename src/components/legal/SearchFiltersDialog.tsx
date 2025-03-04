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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Save, X, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchFilter {
  id: string;
  name: string;
  type: string;
  status?: string[];
  category?: string[];
  property?: string;
  dateRange?: DateRange;
  searchQuery?: string;
}

interface SearchFiltersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  onSaveFilter?: (filter: SearchFilter) => void;
  savedFilters?: SearchFilter[];
  currentFilters?: any;
  filterType: "contracts" | "documents" | "compliance";
}

const SearchFiltersDialog = ({
  isOpen,
  onClose,
  onApplyFilters,
  onSaveFilter,
  savedFilters = [],
  currentFilters = {},
  filterType,
}: SearchFiltersDialogProps) => {
  const [filters, setFilters] = useState(currentFilters);
  const [selectedSavedFilter, setSelectedSavedFilter] = useState<string>("");
  const [newFilterName, setNewFilterName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);

  // Status options based on filter type
  const getStatusOptions = () => {
    switch (filterType) {
      case "contracts":
        return [
          { id: "active", label: "Active" },
          { id: "expiring", label: "Expiring Soon" },
          { id: "expired", label: "Expired" },
          { id: "draft", label: "Draft" },
        ];
      case "compliance":
        return [
          { id: "completed", label: "Completed" },
          { id: "pending", label: "Pending" },
          { id: "overdue", label: "Overdue" },
        ];
      default:
        return [];
    }
  };

  // Category options based on filter type
  const getCategoryOptions = () => {
    switch (filterType) {
      case "contracts":
        return [
          { id: "lease", label: "Lease" },
          { id: "vendor", label: "Vendor" },
          { id: "employment", label: "Employment" },
          { id: "insurance", label: "Insurance" },
          { id: "service", label: "Service" },
        ];
      case "documents":
        return [
          { id: "deed", label: "Deed" },
          { id: "permit", label: "Permit" },
          { id: "certificate", label: "Certificate" },
          { id: "policy", label: "Policy" },
          { id: "corporate", label: "Corporate" },
        ];
      case "compliance":
        return [
          { id: "safety", label: "Safety" },
          { id: "tax", label: "Tax" },
          { id: "accessibility", label: "Accessibility" },
          { id: "insurance", label: "Insurance" },
          { id: "disclosure", label: "Disclosure" },
          { id: "maintenance", label: "Maintenance" },
          { id: "training", label: "Training" },
        ];
      default:
        return [];
    }
  };

  // Property options
  const propertyOptions = [
    { id: "all", label: "All Properties" },
    { id: "sunset-apartments", label: "Sunset Apartments" },
    { id: "parkview-residences", label: "Parkview Residences" },
    { id: "highland-towers", label: "Highland Towers" },
    { id: "riverside-condos", label: "Riverside Condos" },
  ];

  const handleStatusChange = (statusId: string) => {
    const currentStatuses = filters.status || [];
    if (currentStatuses.includes(statusId)) {
      setFilters({
        ...filters,
        status: currentStatuses.filter((id: string) => id !== statusId),
      });
    } else {
      setFilters({
        ...filters,
        status: [...currentStatuses, statusId],
      });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const currentCategories = filters.category || [];
    if (currentCategories.includes(categoryId)) {
      setFilters({
        ...filters,
        category: currentCategories.filter((id: string) => id !== categoryId),
      });
    } else {
      setFilters({
        ...filters,
        category: [...currentCategories, categoryId],
      });
    }
  };

  const handlePropertyChange = (propertyId: string) => {
    setFilters({
      ...filters,
      property: propertyId,
    });
  };

  const handleDateRangeChange = (range: DateRange) => {
    setFilters({
      ...filters,
      dateRange: range,
    });
  };

  const handleSearchQueryChange = (query: string) => {
    setFilters({
      ...filters,
      searchQuery: query,
    });
  };

  const handleSavedFilterSelect = (filterId: string) => {
    setSelectedSavedFilter(filterId);
    const selectedFilter = savedFilters.find(
      (filter) => filter.id === filterId,
    );
    if (selectedFilter) {
      setFilters({
        status: selectedFilter.status || [],
        category: selectedFilter.category || [],
        property: selectedFilter.property || "",
        dateRange: selectedFilter.dateRange || {},
        searchQuery: selectedFilter.searchQuery || "",
      });
    }
  };

  const handleSaveFilter = () => {
    if (newFilterName.trim() && onSaveFilter) {
      const newFilter: SearchFilter = {
        id: `filter-${Date.now()}`,
        name: newFilterName,
        type: filterType,
        ...filters,
      };
      onSaveFilter(newFilter);
      setNewFilterName("");
      setShowSaveForm(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({});
    setSelectedSavedFilter("");
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Advanced Search & Filters</DialogTitle>
          <DialogDescription>
            Refine your search with multiple criteria.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Saved Filters */}
          {savedFilters.length > 0 && (
            <div className="space-y-2">
              <Label>Saved Filters</Label>
              <Select
                value={selectedSavedFilter}
                onValueChange={handleSavedFilterSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a saved filter" />
                </SelectTrigger>
                <SelectContent>
                  {savedFilters.map((filter) => (
                    <SelectItem key={filter.id} value={filter.id}>
                      {filter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Search Query */}
          <div className="space-y-2">
            <Label>Search Term</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by title, description, or content..."
                className="pl-10"
                value={filters.searchQuery || ""}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Status Filters */}
          {getStatusOptions().length > 0 && (
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex flex-wrap gap-2">
                {getStatusOptions().map((status) => (
                  <div key={status.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status.id}`}
                      checked={(filters.status || []).includes(status.id)}
                      onCheckedChange={() => handleStatusChange(status.id)}
                    />
                    <Label htmlFor={`status-${status.id}`}>
                      {status.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {getCategoryOptions().map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={(filters.category || []).includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`}>
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Property Filter */}
          <div className="space-y-2">
            <Label>Property</Label>
            <Select
              value={filters.property || ""}
              onValueChange={handlePropertyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Properties</SelectItem>
                {propertyOptions.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <DatePickerWithRange
              selected={filters.dateRange}
              onSelect={handleDateRangeChange}
              className="w-full"
            />
          </div>

          {/* Active Filters Summary */}
          {(filters.status?.length > 0 ||
            filters.category?.length > 0 ||
            filters.property ||
            filters.dateRange?.from ||
            filters.searchQuery) && (
            <div className="bg-muted/20 p-3 rounded-md space-y-2">
              <div className="flex items-center justify-between">
                <Label>Active Filters</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  type="button"
                >
                  <X className="h-4 w-4 mr-1" /> Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.searchQuery && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Search: {filters.searchQuery}
                  </Badge>
                )}
                {filters.status?.map((statusId: string) => {
                  const status = getStatusOptions().find(
                    (s) => s.id === statusId,
                  );
                  return (
                    <Badge
                      key={statusId}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      Status: {status?.label || statusId}
                    </Badge>
                  );
                })}
                {filters.category?.map((categoryId: string) => {
                  const category = getCategoryOptions().find(
                    (c) => c.id === categoryId,
                  );
                  return (
                    <Badge
                      key={categoryId}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      Category: {category?.label || categoryId}
                    </Badge>
                  );
                })}
                {filters.property && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Property:{" "}
                    {propertyOptions.find((p) => p.id === filters.property)
                      ?.label || filters.property}
                  </Badge>
                )}
                {filters.dateRange?.from && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Date Range: {filters.dateRange.from.toLocaleDateString()} -{" "}
                    {filters.dateRange.to?.toLocaleDateString() || ""}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Save Filter Form */}
          {onSaveFilter && (
            <div>
              {!showSaveForm ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaveForm(true)}
                  type="button"
                >
                  <Save className="h-4 w-4 mr-2" /> Save This Filter
                </Button>
              ) : (
                <div className="space-y-2">
                  <Label>Save Filter As</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Filter name"
                      value={newFilterName}
                      onChange={(e) => setNewFilterName(e.target.value)}
                    />
                    <Button
                      size="sm"
                      onClick={handleSaveFilter}
                      disabled={!newFilterName.trim()}
                      type="button"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSaveForm(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleApplyFilters} type="button">
            <Filter className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchFiltersDialog;
