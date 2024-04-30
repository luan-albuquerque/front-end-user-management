import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./pages/ErroPage";
import { LoginPage } from "./pages/LoginPage";
import { RepairPasswordPage } from "./pages/RepairPasswordPage";
import { UpdatePasswordPage } from "./pages/UpdatePasswordPage";
import { HomePage } from "./pages/HomePage";
import { redirect } from "./redirect.navigate";
import { ProtectedRoute } from "./guards/protected.route";
import { UsersPage } from "./pages/UsersPage";
import { DashboradPage } from "./pages/DashboradPage";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: (
       <ProtectedRoute allowedRoles={[1, 2]}>
        <App />
       </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: redirect.homePage,
        element: (
           <ProtectedRoute allowedRoles={[1, 2]}>
            <HomePage />
           </ProtectedRoute>
        ),
      },
      {
        path: redirect.dashboradPage,
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <DashboradPage />
          </ProtectedRoute>
        ),
      },
       {
         path: redirect.usersPage,
         element: (
           <ProtectedRoute allowedRoles={[1]}>
             <UsersPage />
           </ProtectedRoute>
         ),
       },
    ],
  },
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/repair-password", element: <RepairPasswordPage /> },
  { path: "/update-password", element: <UpdatePasswordPage /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "*", element: <ErrorPage /> },
]);
