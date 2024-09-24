import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GeneralErrorBoundary from "~/components/GeneralErrorBoundary.tsx";
import RootRoute from "~/pages/Root.tsx";
import { privateRoutes } from "~/routes/private-routes.tsx";
import { publicRoutes } from "~/routes/public-routes.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootRoute />,
        errorElement: <GeneralErrorBoundary />,
        children: [privateRoutes, ...publicRoutes],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};
export default AppRoutes;
