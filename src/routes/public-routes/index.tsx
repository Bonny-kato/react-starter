import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={"Welcome to the login page"} />
            <Route path={"*"} element={"known page"} />
        </Routes>
    );
};
export default PublicRoutes;
