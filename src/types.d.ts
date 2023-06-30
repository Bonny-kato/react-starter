export interface IUser {
    firstName: string;
    surname: string;
    email: string;
    roles: IRole[];
}

export interface IRole {
    name: string;
    description: string;
    permissions: IPermission[];
}

export interface IPermission {
    id: number;
    name: string;
    displayName: string;
    description: string;
}
