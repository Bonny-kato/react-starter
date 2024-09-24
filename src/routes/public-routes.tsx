import { Navigate, RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
    { path: "/", element: <Navigate to={"/login"} /> },
    { path: "/login", element: "login page" },
    //💡other public routes go here
    { path: "*", element: "page note found" },
];
