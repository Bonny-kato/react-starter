import { Can, Cannot, hasAnyPermission, Switch } from "./permission";

export { default } from "./permission";
export { Can, hasAnyPermission, Cannot, Switch };

export const permissions = {
    /*
     * The 'permissions' object holds permission string constants.
     * Each constant represents a specific user action, for example: VIEW_USERS corresponds to "view_users".
     * To use these permissions with a <Can/> component, use the following pattern:
     * <Can permissions={permissions.VIEW_USERS}> {children}</Can>
     */
};
