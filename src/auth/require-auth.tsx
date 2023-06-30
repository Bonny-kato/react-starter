import React, { FC, ReactNode, useState } from "react";
import { useAuth } from "@/auth/auth";
import { Navigate, useLocation } from "react-router-dom";
import PermissionProvider from "@/providers/permission";
import AuthLayout from "@/layouts";
import { IUser } from "@/types";

const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
    const { authUser: currAuth } = useAuth();
    const [authUser] = useState<IUser>(() => currAuth);

    const location = useLocation();

    if (!authUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
        <PermissionProvider>
            <AuthLayout>{children}</AuthLayout>
        </PermissionProvider>
    );
};

export default RequireAuth;
