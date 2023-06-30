## Permission-Based Access Control in React

This TypeScript JSX file implements a permission-based access control using React's Context API. It provides a way to
check if a user has a specific permission to access certain parts of a React application.

---

### Components

#### **1. `Can`**

This is a component that checks if the user has the necessary permissions. If yes, it renders its children; if not, it
either renders nothing or redirects to an unauthorized page, based on the `redirectIfUnauthorized` prop.

Example Usage:

```tsx
import { Can } from "./permission";

const MyComponent = () => {
    return (
        <Can permission={"admin"} redirectIfUnauthorized>
            <AdminComponent />
        </Can>
    )
}
```

or

```tsx
import { Can } from "./permission";

const MyComponent = () => {
    return (
        <Can permission={["writer", "admin"]}>
            <AdminComponent />
        </Can>
    )
}
```

#### **2. `Cannot`**

The opposite of Can, this component renders its children only when the user does NOT have the required permissions.

Example Usage:

```tsx
import { Cannot } from "./permission";

const MyComponent = () => {
    return (
        <Cannot permission={"admin"}>
            <AdminComponent />
        </Cannot>
    )
}
```

or passing the list of permissions in array

```tsx
import { Cannot } from "./permission";

const MyComponent = () => {
    return (
        <Cannot permission={["writer", "admin"]} redirectIfUnauthorized>
            <AdminComponent />
        </Cannot>
    )
}
```

#### **3. `Switch`**

This component takes a series of Can and/or Cannot components as children and renders the first child Can component that
passes its permission check. This is useful for alternative interface elements based on permissions.

Example Usage:

```tsx
import { Can, Switch } from "./permission";

const MyComponent = () => {
    return (
        <Switch>
            <Can permission="admin">
                <AdminComponent />
            </Can>
            <Can>
                <DefaultComponent />
            </Can>
        </Switch>
    )
}
```

#### **4. `PermissionProvider`**

This component provide a context for its children which allows them access to the user permission data. You should wrap
your top-level component (usually App) with this.

Example Usage:

```tsx
import { Can } from "./permission";

const MyApp = () => {
    return (
        <PermissionProvider>
            <App />
        </PermissionProvider>
    )
}
```

### Hooks and Functions

#### **1. `usePermission`**

This hook enables you to access the permission context which contains all permissions for the current user. It throws an
error if used outside a PermissionProvider.

Example Usage:

```tsx
import { Can } from "./permission";
import { permissions } from "./index";

const MyComponent = () => {
    const { permissions } = usePermission();
    console.log(permissions)
    return (
        <div>Hi,There!</div>
    )
}
```

#### **2. `matchPermission(userPermissions, props)`**

This function takes a list of user permissions and a props object (with a permission field) and checks if the user has
the required permissions. it used internally for checking user permission

Example Usage:

```ts
if (matchPermission(userPermissions, { permission: 'admin' })) {
    // do something..
}
```

#### **3. `hasAnyPermission(permission)`**

This function checks if the user has at least one of the required permissions (which can be a string or a string array).

Example Usage:

```tsx
if (hasAnyPermission(['admin', 'moderator'])) {
    console.log('User is an admin or a moderator');
}
```