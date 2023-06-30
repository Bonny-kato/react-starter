import { ReactNode } from "react";

const AuthLayout = ({ children }: ReactNode) => {
    return (
        <>
            <main>
                <header>header</header>
                <section>{children}</section>
            </main>
        </>
    );
};
export default AuthLayout;
