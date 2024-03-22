import { Route, Routes } from "react-router-dom";

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path={"/login"} element={"Welcome to the login page"} />
            <Route path={"*"} element={"known page"} />
        </Routes>
    );
};
export default PublicRoutes;
