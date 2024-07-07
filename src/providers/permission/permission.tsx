import _ from "lodash";
import React, {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
} from "react";
import { Navigate } from "react-router-dom";
import { localStorageKeys } from "~/constants.ts";
import { IUser } from "~/types";
import { lStorage } from "~/utils";

type PermissionContextType = {
    userPermissions: string[];
};

export const PermissionContext = createContext<PermissionContextType | null>(
    null,
);

// Hook to use the permission context. It throws an error if used outside the PermissionProvider
export const usePermission = (): PermissionContextType => {
    const permissionObj = useContext(PermissionContext);
    if (!permissionObj) {
        throw new Error(
            "usePermission should be used inside of PermissionProvider",
        );
    }
    return permissionObj;
};

// Function, matchPermission, checks if user has required permissions
export const matchPermission = (
    userPermissions: string[],
    props: { permissions?: string | string[] },
): boolean => {
    let match: boolean;
    const { permissions = [] } = props;
    const permissionArr = Array.isArray(permissions)
        ? _.map(permissions, _.toLower)
        : [permissions.toLowerCase()];
    if (permissionArr.length === 0) match = true;
    else {
        match = permissionArr.some((p) => userPermissions.includes(p));
    }
    return match;
};

type TCan = {
    permissions?: string | string[];
    redirectIfUnauthorized?: boolean;
    children: ReactNode;
};

//The Can component is a permission check component
// that checks if the user has necessary permissions and then either renders its children or initiates a redirect,
// based on the props.
export const Can: React.FC<TCan> = ({
    children,
    redirectIfUnauthorized = false,
    ...props
}) => {
    const { userPermissions: userPermissions = [] } = usePermission();
    const match = matchPermission(userPermissions, props);
    if (match) {
        return <>{children}</>;
    }

    if (redirectIfUnauthorized) {
        return <Navigate to={"/dashboard/unauthorized"} />;
    } else {
        return null;
    }
};

// Cannot is a component which only renders children when a user does NOT have the required permission.
export const Cannot: React.FC<TCan> = ({ children, ...props }) => {
    const { userPermissions: userPermissions = [] } = usePermission();
    const match = matchPermission(userPermissions, props);
    return match ? null : <>{children}</>;
};

// checks if user has at least one of the required permissions
export const hasAnyPermission = (permissions: string | string[]): boolean => {
    const userPermissions = getUserPermission();
    return matchPermission(userPermissions, { permissions });
};

// Switch component renders the first Can component that meets the permission requirements from a group of Can and Cannot components
export const Switch: React.FC<{ children: ReactNode }> = ({ children }) => {
    let match = false;
    let element: ReactElement | null = null;
    const { userPermissions: userPermissions } = usePermission();

    React.Children.forEach(children, (child) => {
        if (!match && React.isValidElement(child) && child.type === Can) {
            element = child;
            match = matchPermission(userPermissions, child.props);
        }
    });
    return match ? <>{element}</> : null;
};

// The PermissionProvider wraps its children to provide them access to the permission context
export const getUserPermission = (): string[] => {
    const user: IUser = lStorage.getValue(localStorageKeys.AUTH_USER, {});
    const { permissions: permissionObj = [] } = user?.roles[0] || {};
    return permissionObj.map((permission) => {
        return permission?.name?.toLowerCase() || "";
    });
};

// The PermissionProvider wraps its children to provide them access to the permission context
const PermissionProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const userPermissions = getUserPermission();
    return (
        <PermissionContext.Provider value={{ userPermissions }}>
            {children}
        </PermissionContext.Provider>
    );
};

export default PermissionProvider;
