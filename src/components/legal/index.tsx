import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import LegalDashboard from "./LegalDashboard";
import Contracts from "./Contracts";
import ContractDetail from "./ContractDetail";
import ContractForm from "./ContractForm";
import Documents from "./Documents";
import DocumentDetail from "./DocumentDetail";
import DocumentForm from "./DocumentForm";
import Compliance from "./Compliance";
import ComplianceDetail from "./ComplianceDetail";
import ComplianceForm from "./ComplianceForm";

const Legal = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<LegalDashboard />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/contracts/:contractId" element={<ContractDetail />} />
        <Route path="/contracts/new" element={<ContractForm />} />
        <Route
          path="/contracts/:contractId/edit"
          element={<ContractForm isEditing />}
        />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:documentId" element={<DocumentDetail />} />
        <Route path="/documents/new" element={<DocumentForm />} />
        <Route
          path="/documents/:documentId/edit"
          element={<DocumentForm isEditing />}
        />
        <Route path="/compliance" element={<Compliance />} />
        <Route
          path="/compliance/:complianceId"
          element={<ComplianceDetail />}
        />
        <Route path="/compliance/new" element={<ComplianceForm />} />
        <Route
          path="/compliance/:complianceId/edit"
          element={<ComplianceForm isEditing />}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default Legal;
