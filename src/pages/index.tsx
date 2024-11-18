import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div>
            Home page
            <hr />
            <Link to={"/dashboard"}>Go to Dashboard</Link>
        </div>
    );
};
export default Index;
