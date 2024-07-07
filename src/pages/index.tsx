import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Index = () => {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const res = await fetch("/api/users");
            return await res.json();
        },
        queryKey: ["users"],
    });

    console.log("[data]", data);
    return (
        <div>
            {isLoading && "is loading"}
            {JSON.stringify(data)}
            <Link to={"/dashboard"}>dashboard</Link>
        </div>
    );
};
export default Index;
