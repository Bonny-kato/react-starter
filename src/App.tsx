import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "@/routes";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <Toaster position={"top-center"} />
            <ReactQueryDevtools
                initialIsOpen={false}
                position={"bottom-right"}
            />
        </QueryClientProvider>
    );
}

export default App;
