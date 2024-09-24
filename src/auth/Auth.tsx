import { createContext, FC, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { IUser } from "~/types";
import { lStorage, lStorageKeys } from "~/utils/localStorage.ts";

interface AuthContextData {
    authUser: IUser;
    authToken: string;
    signOut: (callback?: VoidFunction) => void;
    saveAuthUser: (user: IUser, token: string) => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { from } = location.state || {
        from: {
            pathname: "/dashboard",
        },
    };

    const signOut = (callback?: VoidFunction) => {
        lStorage.setValues({
            [lStorageKeys.AUTH_TOKEN]: null,
            [lStorageKeys.AUTH_USER]: null,
        });

        if (callback && typeof callback === "function") {
            callback();
        }
        navigate("/login", {
            state: {
                from: location.pathname,
            },
        });
    };

    const saveAuthUser = async (user: object, token: string) => {
        lStorage.setValues({
            [lStorageKeys.AUTH_TOKEN]: token,
            [lStorageKeys.AUTH_USER]: user,
        });
        return navigate(from);
    };

    const value = {
        authUser: lStorage.getValue(lStorageKeys.AUTH_USER),
        authToken: lStorage.getValue(lStorageKeys.AUTH_TOKEN),
        saveAuthUser,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

export function useAuth(): AuthContextData {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}
