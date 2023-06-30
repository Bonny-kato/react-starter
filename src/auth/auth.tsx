import { createContext, FC, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorageState from "@/utils/local-storage";
import { IUser } from "@/types";

interface AuthContextData {
    authUser: IUser;
    authToken: string;
    signOut: (callback?: () => void) => void;
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
    const [authUser, setAuthUser] = useLocalStorageState("authUser", null);
    const [authToken, setAuthToken] = useLocalStorageState("authToken", null);

    async function signOut(callback: () => void) {
        setAuthToken(null);
        setAuthUser(null);

        if (callback && typeof callback === "function") {
            await callback();
        }
        navigate("/login");
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
        // @ts-ignore
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}
