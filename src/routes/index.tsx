import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthProvider from "@/auth";
import PrivateRoutes from "@/routes/private-routes.tsx";
import PublicRoutes from "@/routes/public-routes.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path={"/dashboard/*"} element={<PrivateRoutes />} />
                    <Route path={"/*"} element={<PublicRoutes />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};
export default AppRoutes;
