import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <section>
            <header>header</header>
            <section>{children}</section>
        </section>
    );
};
export default AuthLayout;
