import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CompanyContextProvider from "./contexts/CompanyContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./contexts/UserContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CompanyContextProvider>
          <App />
        </CompanyContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
