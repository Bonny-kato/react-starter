import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoutes from "@/routes/public-routes.tsx";
import { AuthProvider } from "@/auth/auth.tsx";
import PrivateRoutes from "@/routes/private-routes.tsx";

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
