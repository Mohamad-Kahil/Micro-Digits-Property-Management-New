import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import TenantList from "./TenantList";
import TenantDetail from "./TenantDetail";
import TenantForm from "./TenantForm";
import TenantPayments from "./TenantPayments";
import TenantCommunication from "./TenantCommunication";

const Tenants = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<TenantList />} />
        <Route path="/:tenantId" element={<TenantDetail />} />
        <Route path="/new" element={<TenantForm />} />
        <Route path="/:tenantId/edit" element={<TenantForm isEditing />} />
        <Route path="/:tenantId/payments" element={<TenantPayments />} />
        <Route
          path="/:tenantId/communication"
          element={<TenantCommunication />}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default Tenants;
