import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "~/root.tsx";
import privateRoutesConfig from "~/routes/private-routes.config.tsx";
import publicRoutesConfig from "~/routes/public-routes.config.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [...privateRoutesConfig, ...publicRoutesConfig],
    },
]);

const AppRoutes = () => <RouterProvider router={router} />;
export default AppRoutes;
