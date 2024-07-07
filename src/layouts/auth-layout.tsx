import { FC, ReactNode } from "react";
import { isDevEnvironment } from "~/utils";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
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
