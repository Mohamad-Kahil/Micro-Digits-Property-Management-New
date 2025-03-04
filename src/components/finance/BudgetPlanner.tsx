import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Save } from "lucide-react";

const BudgetPlanner = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
          <p className="text-muted-foreground mt-2">
            Plan and track your property budgets.
          </p>
        </div>
        <Button type="button">
          <Save className="mr-2 h-4 w-4" /> Save Budget
        </Button>
      </div>

      <Tabs defaultValue="annual">
        <TabsList>
          <TabsTrigger value="annual">Annual Budget</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>

        <TabsContent value="annual" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Annual Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Annual budget planning interface will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quarterly" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Budget View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Quarterly budget view will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Monthly budget view will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPlanner;
