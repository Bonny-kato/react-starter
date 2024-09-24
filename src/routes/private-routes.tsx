import RequireAuth from "@/auth/require-auth";
import { dashboardRoutes } from "@/pages/dashboard/routes/dashboard-routes.tsx";
import { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject = {
    path: "/dashboard",
    element: <RequireAuth />,
    children: [
        dashboardRoutes,
        //💡another route object will be going down here
    ],
};
