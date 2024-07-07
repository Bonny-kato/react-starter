import { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/dashboard/index.tsx";

const dashboardRoutes: RouteObject = {
    path: "",
    element: <Dashboard />,
    children: [
        {
            path: "text",
            element: "this is text component",
        },
    ],
};

export default dashboardRoutes;
