import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ConnectWallet from "./Pages/ConnectWalletPage.tsx";
import Blacklsited from "./Pages/BlacklistedPage.tsx";
import Register from "./Pages/RegisterPage.tsx";
import Nft from "./Pages/NftPage.tsx";
import MyEvents from "./Pages/MyEventsPage.tsx";

import { config } from "./wagmi.ts";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectWallet />,
  },
  {
    path: "blacklisted",
    element: <Blacklsited />,
  },
  {
    path: "register-page",
    element: <Register />,
  },
  {
    path: "nft-page",
    element: <Nft />,
  },
  {
    path: "my-events-page",
    element: <MyEvents />,
  },
]);

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
