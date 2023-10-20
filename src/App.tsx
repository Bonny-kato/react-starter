import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppRoutes from "@/routes";

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
