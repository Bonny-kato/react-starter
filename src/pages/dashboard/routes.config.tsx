import { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/dashboard/index.tsx";
import Users from "~/pages/dashboard/users";

const dashboardRoutes: RouteObject = {
    path: "",
    element: <Dashboard />,
    children: [
        {
            path: "text",
            element: "this is text component",
        },
        {
            path: "users",
            element: <Users />,
        },
    ],
};

export default dashboardRoutes;
