import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import FinanceDashboard from "./FinanceDashboard";
import Transactions from "./Transactions";
import Invoices from "./Invoices";
import Expenses from "./Expenses";
import Reports from "./Reports";
import BudgetPlanner from "./BudgetPlanner";
import TaxDocuments from "./TaxDocuments";

const Finance = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<FinanceDashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/invoices/*" element={<Invoices />} />
        <Route path="/expenses/*" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/tax-documents" element={<TaxDocuments />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Finance;
