import { RouteObject } from "react-router-dom";
import RequireAuth, { loader as authLoader } from "~/auth/require-auth.tsx";
import dashboardRoutes from "~/pages/dashboard/routes.config.tsx";

const privateRoutesConfig: RouteObject[] = [
    {
        path: "/dashboard/*",
        element: <RequireAuth />,
        loader: authLoader,
        children: [dashboardRoutes],
    },
];

export default privateRoutesConfig;
