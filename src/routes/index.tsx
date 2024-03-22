import GeneralErrorBoundary from "@/components/GeneralErrorBoundary.tsx";
import HomePage from "@/pages/home/Home.tsx";
import RootRoute from "@/pages/Root.tsx";
import PrivateRoutes from "@/routes/private-routes.tsx";
import PublicRoutes from "@/routes/public-routes.tsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootRoute />}>
            <Route errorElement={<GeneralErrorBoundary />}>
                <Route index element={<HomePage />} />
                <Route path={"/dashboard/*"} element={<PrivateRoutes />} />
                <Route path={"/*"} element={<PublicRoutes />} />
            </Route>
        </Route>,
    ),
);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};
export default AppRoutes;
