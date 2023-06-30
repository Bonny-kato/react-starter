import { ReactNode } from "react";
import { isDevEnvironment } from "@/utils";

const AuthLayout = ({ children }: ReactNode) => {
    return (
        <>
            <main className={isDevEnvironment() ? "debug-screens" : ""}>
                <header>header</header>
                <section>{children}</section>
            </main>
        </>
    );
};
export default AuthLayout;
