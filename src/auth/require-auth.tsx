import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "~/auth/auth.tsx";
import AuthLayout from "~/layouts";

const RequireAuth = () => {
    const { authUser } = useAuth();
    const { pathname } = useLocation();

    if (!authUser) {
        return <Navigate to="/login" state={{ from: pathname }} replace />;
    }
    return (
        // <PermissionProvider>
        <AuthLayout>
            <Outlet />
        </AuthLayout>
        // </PermissionProvider>
    );
};

export default RequireAuth;
