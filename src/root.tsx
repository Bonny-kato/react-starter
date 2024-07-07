import { Outlet } from "react-router-dom";
import AuthProvider from "~/auth";

const Root = () => {
    return (
        <main>
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        </main>
    );
};
export default Root;
