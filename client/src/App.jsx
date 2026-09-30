import "./App.css";

import AddConsignment from "./assets/pages/Addconsignment";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./assets/components/Layout";
import AddConsignor from "./assets/pages/Addconsignor";
import UpdateConsignment from "./assets/pages/Updateconsignment";
import TotalConsignor from "./assets/pages/Totalconsignor";
import TotalConsignment from "./assets/pages/Totalconsignment";
import EditConsignment from "./assets/pages/Editconsignment";
import Login from "./assets/components/Login";
import Logout from "./assets/components/Logout";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import ManageRoles from "./assets/components/ManageRoles";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES - NO SIDEBAR */}
        <Route path="/login" element={<Login />} />

        <Route path="/logout" element={<Logout />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PROTECTED ROUTES - WITH LAYOUT AND SIDEBAR */}
        <Route
          path="/total-consignor"
          element={
            <ProtectedRoute>
              <Layout>
                <TotalConsignor />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-consignment/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditConsignment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-consignor"
          element={
            <ProtectedRoute>
              <Layout>
                <AddConsignor />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-consignment"
          element={
            <ProtectedRoute>
              <Layout>
                <AddConsignment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-consignment"
          element={
            <ProtectedRoute>
              <Layout>
                <UpdateConsignment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/total-consignment"
          element={
            <ProtectedRoute>
              <Layout>
                <TotalConsignment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-roles"
          element={
            <ProtectedRoute>
              <Layout>
                <ManageRoles />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Unknown pages go to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;