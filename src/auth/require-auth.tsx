import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/auth";
import AuthLayout from "@/layouts";
import PermissionProvider from "@/providers/permission";

const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
    const { authUser } = useAuth();
    const { pathname } = useLocation();

    if (!authUser) {
        return <Navigate to="/login" state={{ from: pathname }} replace />;
    }
    return (
        <PermissionProvider>
            <AuthLayout>{children}</AuthLayout>
        </PermissionProvider>
    );
};

export default RequireAuth;
