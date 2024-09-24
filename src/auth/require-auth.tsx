import { useAuth } from "@/auth";
import AuthLayout from "@/layouts";
import PermissionProvider from "@/providers/permission";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
    const { authUser } = useAuth();
    const { pathname } = useLocation();

    if (!authUser) {
        return <Navigate to="/login" state={{ from: pathname }} replace />;
    }
    return (
        <PermissionProvider>
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        </PermissionProvider>
    );
};

export default RequireAuth;
