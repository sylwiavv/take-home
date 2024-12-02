import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Entrypoint } from "./components/templates/Entrypoint";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex items-center justify-center">
        <Entrypoint />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
