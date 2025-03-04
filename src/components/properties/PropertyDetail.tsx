import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Home,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Image,
  Edit,
  Trash2,
  ChevronLeft,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PropertyUnitList } from "./PropertyUnitList";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyDocuments } from "./PropertyDocuments";

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  occupancyRate: number;
  status: "active" | "inactive" | "maintenance";
  yearBuilt: number;
  totalArea: number;
  amenities: string[];
  description: string;
  financials: {
    monthlyRevenue: number;
    operatingExpenses: number;
    netIncome: number;
  };
  images: string[];
}

const mockProperties: Record<string, Property> = {
  "prop-001": {
    id: "prop-001",
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90001",
    type: "Apartment Complex",
    units: 24,
    occupancyRate: 92,
    status: "active",
    yearBuilt: 2010,
    totalArea: 32000,
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Covered Parking",
      "Rooftop Deck",
      "Pet Friendly",
      "In-unit Laundry",
    ],
    description:
      "Sunset Apartments offers modern living in the heart of Los Angeles. With spacious floor plans and premium amenities, residents enjoy the perfect balance of comfort and convenience. The property features a resort-style pool, state-of-the-art fitness center, and is located near shopping, dining, and entertainment options.",
    financials: {
      monthlyRevenue: 86400,
      operatingExpenses: 42000,
      netIncome: 44400,
    },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    ],
  },
  "prop-002": {
    id: "prop-002",
    name: "Parkview Residences",
    address: "456 Park Ave, San Francisco, CA 94101",
    type: "Condominium",
    units: 16,
    occupancyRate: 88,
    status: "active",
    yearBuilt: 2015,
    totalArea: 24000,
    amenities: [
      "Concierge Service",
      "Underground Parking",
      "Rooftop Garden",
      "Smart Home Features",
      "Wine Cellar",
    ],
    description:
      "Parkview Residences is a luxury condominium development offering upscale living in San Francisco. Each unit features high-end finishes, floor-to-ceiling windows with park views, and smart home technology. Residents enjoy premium amenities including concierge service and a rooftop garden with panoramic city views.",
    financials: {
      monthlyRevenue: 72000,
      operatingExpenses: 38000,
      netIncome: 34000,
    },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
  },
};

const PropertyDetail = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, you would fetch the property data based on the ID
  const property = propertyId ? mockProperties[propertyId] : null;

  if (!property) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Property Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The property you're looking for doesn't exist.
          </p>
          <Button className="mt-4" onClick={() => navigate("/properties")}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: Property["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100/80">
            Inactive
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100/80">
            Maintenance
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => navigate("/properties")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {property.name}
            </h1>
            {getStatusBadge(property.status)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit Property
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Property Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Units
                </CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{property.units}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Occupancy Rate
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {property.occupancyRate}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Year Built
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{property.yearBuilt}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${property.financials.monthlyRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {property.description}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Property Type</h3>
                      <p className="text-muted-foreground">{property.type}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Total Area</h3>
                      <p className="text-muted-foreground">
                        {property.totalArea.toLocaleString()} sq ft
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">New tenant moved in</p>
                        <p className="text-sm text-muted-foreground">
                          Unit 204 - Sarah Johnson
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 days ago
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Trash2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Maintenance request completed
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Unit 108 - Plumbing issue fixed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          5 days ago
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Rent payment received</p>
                        <p className="text-sm text-muted-foreground">
                          Unit 301 - Michael Chen
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 week ago
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Amenities & Featured Image */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {property.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setActiveTab("gallery")}
                  >
                    <Image className="mr-2 h-4 w-4" /> View All Images
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Units Tab */}
        <TabsContent value="units">
          <PropertyUnitList propertyId={property.id} />
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery">
          <PropertyGallery
            images={property.images}
            propertyName={property.name}
          />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <PropertyDocuments propertyId={property.id} />
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Monthly Revenue
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      ${property.financials.monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Operating Expenses
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      ${property.financials.operatingExpenses.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Net Income</p>
                    <p className="text-3xl font-bold">
                      ${property.financials.netIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Revenue chart will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Expense chart will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyDetail;
