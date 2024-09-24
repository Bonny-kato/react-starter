import Dashboard from "@/pages/dashboard";
import { RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject = {
    path: "",
    element: <Dashboard />,
    children: [
        {
            path: "text",
            element: "this is text component",
        },
    ],
};
