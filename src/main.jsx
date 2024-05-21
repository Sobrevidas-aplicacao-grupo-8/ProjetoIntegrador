import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Cadastro from "./routes/Cadastro.jsx";
import Paciente from "./routes/paciente.jsx";
import Aoclicaremumpontonomapa from "./routes/aoclicaremumpontonomapa.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/cadastro",
        element: <Cadastro />,
      },
      {
        path: "/paciente",
        element: <Paciente />,
      },
      {
        path: "/aoclicar",
        element: <Aoclicaremumpontonomapa/>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
