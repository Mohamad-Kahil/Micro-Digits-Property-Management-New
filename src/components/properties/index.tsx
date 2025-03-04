import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import PropertyList from "./PropertyList";
import PropertyDetail from "./PropertyDetail";
import PropertyForm from "./PropertyForm";

const Properties = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/:propertyId" element={<PropertyDetail />} />
        <Route path="/new" element={<PropertyForm />} />
        <Route path="/:propertyId/edit" element={<PropertyForm isEditing />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Properties;
