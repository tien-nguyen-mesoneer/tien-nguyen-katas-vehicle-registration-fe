import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import VehicleRegistrationForm from "./components/vehicle-registration-form";
import VehiclePage from "./pages/vehicle.page";
import LoginPage from "./pages/login.page";
import MainLayout from "./components/main-layout";
import ErrorBoundary from "./components/error-boundary";
import VehicleRegistrationList from "./components/vehicle-registration-list";
import AuthMiddleware from "./components/auth-middleware";
import VehicleRegistrationView from "./components/vehicle-registration-view";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="vehicles" />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "vehicles",
          element: (
            <AuthMiddleware>
              <VehiclePage />
            </AuthMiddleware>
          ),
          children: [
            {
              path: "view",
              element: <VehicleRegistrationView />,
            },
            {
              path: "register",
              element: <VehicleRegistrationForm />,
            },
            {
              path: "requests",
              element: <VehicleRegistrationList />,
            },
          ],
        },
      ],
      errorElement: <ErrorBoundary />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
