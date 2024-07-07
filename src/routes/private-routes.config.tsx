import { RouteObject } from "react-router-dom";
import RequireAuth from "~/auth/require-auth.tsx";
import dashboardRoutes from "~/pages/dashboard/routes.config.tsx";

const privateRoutesConfig: RouteObject[] = [
    {
        path: "/dashboard/*",
        element: <RequireAuth />,
        children: [dashboardRoutes],
    },
];

export default privateRoutesConfig;
