import { RouteObject } from "react-router-dom";
import Index from "~/pages";
import LoginPage, { action as loginAction } from "~/pages/login";

const publicRoutesConfig: RouteObject[] = [
    { path: "/", element: <Index /> },
    { path: "/login", element: <LoginPage />, action: loginAction },
    { path: "/register", element: "register" },
    // more rotes like login and so one
];

export default publicRoutesConfig;
