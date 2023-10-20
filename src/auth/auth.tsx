import { createContext, FC, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useLocalStorageState from "@/utils/local-storage";
import type { IUser, TFunction } from "@/types";

interface AuthContextData {
    authUser: IUser;
    authToken: string;
    signOut: (callback?: TFunction) => void;
    saveAuthUser: (user: IUser, token: string) => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { from } = location.state || {
        from: {
            pathname: "/dashboard",
        },
    };
    const [authUser, setAuthUser] = useLocalStorageState("authUser", null);
    const [authToken, setAuthToken] = useLocalStorageState("authToken", null);

    function signOut(callback?: TFunction) {
        const { pathname } = useLocation();
        setAuthToken(null);
        setAuthUser(null);

        if (callback && typeof callback === "function") {
            callback();
        }
        navigate("/login", {
            state: {
                from: pathname,
            },
        });
    }

    const saveAuthUser = async (user: object, token: string) => {
        setAuthToken(token);
        setAuthUser(user);
        return navigate(from);
    };

    const value = {
        authUser,
        authToken,
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
