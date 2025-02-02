import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Ajout de React Query

const queryClient = new QueryClient(); // ✅ Création du client React Query

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ Fournir le client à l'application */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
