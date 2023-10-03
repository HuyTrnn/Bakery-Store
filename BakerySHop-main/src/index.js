import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "~/components";
import { Provider } from "react-redux";
import { store } from "~/store";
import { ProSidebarProvider  } from 'react-pro-sidebar';

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <GlobalStyles>
    <ProSidebarProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProSidebarProvider>
    </GlobalStyles>
  </React.StrictMode>
);
