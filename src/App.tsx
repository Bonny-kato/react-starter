import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { worker } from "~/mocks/browser.ts";
import AppRoutes from "~/routes";
import { isDevEnvironment } from "~/utils";

export const queryClient = new QueryClient();

function App() {
    useEffect(() => {
        if (isDevEnvironment()) {
            worker.start();
        }
    }, []);
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
