import { RouteObject } from "react-router-dom";
import RequireAuth from "~/auth/RequireAuth.tsx";
import { dashboardRoutes } from "~/pages/Dashboard/dashboardRoutes.tsx";

export const privateRoutes: RouteObject = {
    path: "/dashboard",
    element: <RequireAuth />,
    children: [
        dashboardRoutes,
        //💡another route object will be going down here
    ],
};
