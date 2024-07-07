import { Outlet, redirect } from "react-router-dom";
import AuthLayout from "~/layouts";
import { lsKeys, lStorage } from "~/utils/local-storage.ts";

export const loader = async () => {
    const authUser = lStorage.getValue(lsKeys.AUTH_USER);
    if (!authUser) return redirect("/login");
    return null;
};

const RequireAuth = () => {
    return (
        // <PermissionProvider>
        <AuthLayout>
            <Outlet />
        </AuthLayout>
        // </PermissionProvider>
    );
};

export default RequireAuth;
