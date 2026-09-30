import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/check",
          {
            withCredentials: true,
          }
        );

        console.log("AUTH RESPONSE:", res.data);
        console.log("USER ROLE:", res.data.user?.role);

        setUser(res.data.user);
      } catch (error) {
        console.error("Error getting current user:", error);
        setUser(null);
      }
    };

    getCurrentUser();
  }, []);
const permissions = user?.permissions || {};
  // Convert the role safely into a normalized string
  const normalizedRole = String(user?.role || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  const isSuperAdmin = normalizedRole === "superadmin";

  const canViewConsignment =
    user?.role === "superadmin" ||
    permissions?.consignment?.view === true;

  const canViewConsignor =
    user?.role === "superadmin" ||
    permissions?.consignor?.view === true;

  const canViewRoles =
    user?.role === "superadmin";

  console.log("Normalized role:", normalizedRole);
  console.log("Is Super Admin:", isSuperAdmin);

  return (
    <div className="sidebar">
      <div className="logo">
       Notes app
      </div>

      <ul className="menu">
        {canViewConsignment && (
          <>
            <li>
              <Link to="/total-consignment">
               Your notes
              </Link>
            </li>
          </>
        )}

        {/* CONSIGNOR */}
        {canViewConsignor && (
          <li>
            <Link to="/total-consignor">
              Manage Consignor
            </Link>
          </li>
        )}

        {/* ONLY SUPERADMIN CAN SEE THIS */}
        {isSuperAdmin && (
          <li>
            <Link to="/manage-roles">
              Manage Roles
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/logout"
            className="text-decoration-none text-white"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;