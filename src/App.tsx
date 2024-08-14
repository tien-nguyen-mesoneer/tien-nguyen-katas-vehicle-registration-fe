import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import VehicleRegistrationForm from "./components/vehicle-registration-form";
import LoginPage from "./pages/login.page";
import MainLayout from "./components/main-layout";
import ErrorBoundary from "./components/error-boundary";
import VehicleRegistrationList from "./components/vehicle-registration-list";
import AuthMiddleware from "./components/auth-middleware";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <VehicleRegistrationForm />,
        },
        {
          path: "requests",
          element: (
            <AuthMiddleware>
              <VehicleRegistrationList />
            </AuthMiddleware>
          ),
        },
      ],
      errorElement: <ErrorBoundary />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
