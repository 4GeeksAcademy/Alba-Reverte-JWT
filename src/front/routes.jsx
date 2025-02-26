import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import injectContext from "./store/AppContext";


const WrappedLayout = injectContext(Layout);
const WrappedHome = injectContext(Home);
const WrappedSingle = injectContext(Single);
const WrappedDemo = injectContext(Demo);
const WrappedRegister = injectContext(Register);
const WrappedLogin = injectContext(Login);


export const router = createBrowserRouter([
  {
    path: "/",
    element: <WrappedLayout />, // Layout principal
    children: [
      {
        path: "login", // Ruta para Login
        element: <WrappedLogin />,
      },
      {
        path: "register", // Ruta para Register
        element: <WrappedRegister />,
      },
      {
        path: "demo", // Ruta para Demo
        element: <WrappedDemo />,
      },
      {
        path: "single/:id", // Ruta para un elemento individual
        element: <WrappedSingle />,
      },
      {
        index: true, // Página principal
        element: <WrappedHome />,
      },
    ],
  },
]);


