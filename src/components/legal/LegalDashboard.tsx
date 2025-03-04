import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Calendar,
  Scale,
  FileCheck,
} from "lucide-react";
import ContractsList from "./ContractsList";
import DocumentsList from "./DocumentsList";
import ComplianceList from "./ComplianceList";

const LegalDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Legal Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage contracts, legal documents, and compliance requirements for
            your properties.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/legal/documents/new")}
            type="button"
          >
            <FileText className="mr-2 h-4 w-4" /> New Document
          </Button>
          <Button
            onClick={() => navigate("/legal/contracts/new")}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" /> New Contract
          </Button>
        </div>
      </div>

      {/* Legal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Contracts
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">5 renewals upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">8</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance Items
            </CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-green-500">92% compliant</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Legal Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Last updated 3 days ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/legal/contracts")}
          type="button"
        >
          <FileCheck className="mr-2 h-5 w-5" />
          View All Contracts
        </Button>
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/legal/documents")}
          type="button"
        >
          <FileText className="mr-2 h-5 w-5" />
          Legal Documents
        </Button>
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/legal/compliance")}
          type="button"
        >
          <Scale className="mr-2 h-5 w-5" />
          Compliance Tracker
        </Button>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="contracts">
        <TabsList>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts" className="mt-6">
          <ContractsList limit={5} />
        </TabsContent>
        <TabsContent value="documents" className="mt-6">
          <DocumentsList limit={5} />
        </TabsContent>
        <TabsContent value="compliance" className="mt-6">
          <ComplianceList limit={5} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalDashboard;
