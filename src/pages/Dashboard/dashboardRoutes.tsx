import { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/Dashboard/index";

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
