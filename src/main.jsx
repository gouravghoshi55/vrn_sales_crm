import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// NEW: TanStack Query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Optional: Devtools (very useful for debugging queries)
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create one QueryClient instance (shared across the app)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep data fresh in cache for 5 minutes (adjust if needed)
      staleTime: 1000 * 60 * 5,
      // Keep unused data in cache for 30 minutes
      gcTime: 1000 * 60 * 30,
      // Automatically refetch when window is focused (good for multi-tab use)
      refetchOnWindowFocus: true,
      // Retry failed queries 1 time
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>

    {/* Optional but highly recommended: Devtools panel */}
    {/* Comment out in production if you want */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);