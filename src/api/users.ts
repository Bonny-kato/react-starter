import { get } from "~/api/request.ts";

// This file is responsible for defining all the endpoints that are used for data querying or data submission.

export const getUsers = () => {
    // replace this with you own endpoint
    return get("/path/to/users");
};
