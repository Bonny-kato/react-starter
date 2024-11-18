import { Outlet, redirect } from "react-router-dom";
import AuthLayout from "~/layouts";
import { lsKeys, lStorage } from "~/utils/local-storage.ts";

export const loader = async () => {
    console.log("[running in loader]");
    const authUser = lStorage.getValue(lsKeys.AUTH_USER);
    if (!authUser) return redirect("/login");
    return null;
};

const RequireAuth = () => {
    console.log("[running in component]");
    return (
        // <PermissionProvider>
        <AuthLayout>
            <Outlet />
        </AuthLayout>
        // </PermissionProvider>
    );
};

export default RequireAuth;
