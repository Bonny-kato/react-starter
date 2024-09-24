import { Outlet } from "react-router-dom";
import { AuthProvider } from "~/auth/Auth.tsx";
import { isDevMode } from "~/utils";

const RootRoute = () => {
    return (
        <main className={isDevMode ? "debug-screens" : ""}>
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        </main>
    );
};
export default RootRoute;
