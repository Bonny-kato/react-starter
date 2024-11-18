import { useGetUsers } from "~/pages/dashboard/users/user-queries.ts";

const Users = () => {
    const { data: users, isLoading } = useGetUsers();
    return (
        <div>
            {" "}
            Users Component
            <hr />
            {isLoading && "users are loading..."}
            {users && `${users.message}`}
        </div>
    );
};
export default Users;
