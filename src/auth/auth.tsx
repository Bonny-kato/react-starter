import { localStorageKeys } from "@/constants.ts";
import { lStorage } from "@/utils";
import { createContext, FC, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

    function signOut(callback?: TFunction) {
        lStorage.setValues({
            [localStorageKeys.AUTH_TOKEN]: null,
            [localStorageKeys.AUTH_USER]: null,
        })

        if (callback && typeof callback === "function") {
            callback();
        }
        navigate("/login", {
            state: {
                from: location.pathname,
            },
        });
    }

    const saveAuthUser = async (user: object, token: string) => {
        lStorage.setValues({
            [localStorageKeys.AUTH_TOKEN]: token,
            [localStorageKeys.AUTH_USER]: user,
        })
        return navigate(from);
    };

    const value = {
        authUser: lStorage.getValue(localStorageKeys.AUTH_USER),
        authToken:lStorage.getValue(localStorageKeys.AUTH_TOKEN),
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
