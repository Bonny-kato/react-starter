import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <section>
            dashboard page <Outlet />
        </section>
    );
};

export default Dashboard;
