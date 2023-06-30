import Routes from "@/routes";
import { Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
        </Routes>
    );
};
export default DashboardRoutes;
