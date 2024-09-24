import { Navigate, RouteObject } from "react-router-dom";
import Login from "~/pages/Login";

export const publicRoutes: RouteObject[] = [
    { path: "/", element: <Navigate to={"/login"} /> },
    { path: "/login", element: <Login /> },
    //💡other public routes go here
    { path: "*", element: "page note found" },
];
