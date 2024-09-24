import { AuthProvider } from "@/auth/auth.tsx";
import { Outlet } from "react-router-dom";

const RootRoute = () => {
    return (
        <main>
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        </main>
    );
};
export default RootRoute;
