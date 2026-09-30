import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyPermissions = {
  consignor: {
    view: false,
    add: false,
    edit: false,
    delete: false,
    import: false,
    export: false,
  },

  consignment: {
    view: false,
    add: false,
    edit: false,
    delete: false,
    import: false,
    export: false,
  },

  history: {
    view: false,
    add: false,
    edit: false,
    delete: false,
    import: false,
    export: false,
  },

  roles: {
    view: false,
    add: false,
    edit: false,
    delete: false,
    import: false,
    export: false,
  },
};

const ManageRoles = () => {

  const [roles, setRoles] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingRole, setEditingRole] = useState(null);

  const [newRole, setNewRole] = useState({
    name: "",
    status: "Active",
    permissions: structuredClone(emptyPermissions),
  });

  const modules = [
    "consignor",
    "consignment",
    "history",
    "roles",
  ];

  const permissionTypes = [
    "view",
    "add",
    "edit",
    "delete",
    "import",
    "export",
  ];


  // ==============================
  // GET ALL ROLES
  // ==============================

  const fetchRoles = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/roles",
        {
          withCredentials: true,
        }
      );

      console.log("Roles response:", res.data);

      setRoles(res.data.roles || []);

    } catch (error) {

      console.error(
        "Error fetching roles:",
        error
      );

    }

  };


  useEffect(() => {

    fetchRoles();

  }, []);


  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {

    setNewRole({
      name: "",
      status: "Active",
      permissions: structuredClone(emptyPermissions),
    });

    setEditingRole(null);

    setShowForm(false);

  };


  // ==============================
  // ADD ROLE
  // ==============================

  const openAddRole = () => {

    setEditingRole(null);

    setNewRole({
      name: "",
      status: "Active",
      permissions: structuredClone(emptyPermissions),
    });

    setShowForm(true);

  };


  // ==============================
  // EDIT ROLE
  // ==============================

  const openEditRole = (role) => {

    console.log("Editing role:", role);

    setEditingRole(role);

    setNewRole({
      _id: role._id,
      name: role.name,
      status: role.status || "Active",

      permissions: {
        consignor: {
          ...emptyPermissions.consignor,
          ...role.permissions?.consignor,
        },

        consignment: {
          ...emptyPermissions.consignment,
          ...role.permissions?.consignment,
        },

        history: {
          ...emptyPermissions.history,
          ...role.permissions?.history,
        },

        roles: {
          ...emptyPermissions.roles,
          ...role.permissions?.roles,
        },
      },
    });

    setShowForm(true);

  };


  // ==============================
  // CHANGE PERMISSION
  // ==============================

  const handlePermissionChange = (
    module,
    permission,
    checked
  ) => {

    setNewRole((prev) => ({
      ...prev,

      permissions: {

        ...prev.permissions,

        [module]: {

          ...prev.permissions[module],

          [permission]: checked,

        },

      },

    }));

  };


  // ==============================
  // SAVE ROLE
  // ==============================

  const saveRole = async () => {

    if (!newRole.name.trim()) {

      alert("Please enter a role name");

      return;

    }

    try {

      // ============================
      // UPDATE EXISTING ROLE
      // ============================

      if (editingRole !== null) {

        console.log(
          "Updating role:",
          editingRole._id
        );

        const res = await axios.put(

          `http://localhost:5000/api/roles/${editingRole._id}`,

          {
            name: newRole.name,
            status: newRole.status,
            permissions: newRole.permissions,
          },

          {
            withCredentials: true,
          }

        );

        console.log(
          "Updated role response:",
          res.data
        );


        // Replace updated role in frontend
        setRoles((prevRoles) =>

          prevRoles.map((role) =>

            role._id === editingRole._id

              ? res.data.role

              : role

          )

        );


        alert("Role updated successfully");

      }


      // ============================
      // CREATE NEW ROLE
      // ============================

      else {

        const res = await axios.post(

          "http://localhost:5000/api/roles",

          {
            name: newRole.name,
            status: newRole.status,
            permissions: newRole.permissions,
          },

          {
            withCredentials: true,
          }

        );


        console.log(
          "Created role response:",
          res.data
        );


        setRoles((prevRoles) => [

          ...prevRoles,

          res.data.role,

        ]);


        alert("Role created successfully");

      }


      resetForm();

    } catch (error) {

      console.error(
        "Error saving role:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to save role"
      );

    }

  };


  // ==============================
  // DELETE ROLE
  // ==============================

  const deleteRole = async (id, name) => {

    if (name === "Super Admin") {

      alert(
        "Super Admin role cannot be deleted"
      );

      return;

    }


    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );


    if (!confirmed) {

      return;

    }


    try {

      await axios.delete(

        `http://localhost:5000/api/roles/${id}`,

        {
          withCredentials: true,
        }

      );


      setRoles((prevRoles) =>

        prevRoles.filter(
          (role) => role._id !== id
        )

      );


      alert("Role deleted successfully");

    } catch (error) {

      console.error(
        "Error deleting role:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete role"
      );

    }

  };


  // ==============================
  // JSX
  // ==============================

  return (

    <div className="container mt-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Manage Roles
        </h2>

        <button
          className="btn btn-primary"
          onClick={openAddRole}
        >
          Add Role
        </button>

      </div>


      {/* ADD / EDIT FORM */}

      {showForm && (

        <div className="card p-4 mb-4 shadow-sm">

          <h4 className="mb-3">

            {editingRole !== null

              ? `Edit ${newRole.name}`

              : "Add New Role"

            }

          </h4>


          {/* ROLE NAME */}

          <div className="mb-3">

            <label className="form-label">
              Role Name
            </label>

            <input

              type="text"

              className="form-control"

              value={newRole.name}

              onChange={(e) =>

                setNewRole((prev) => ({

                  ...prev,

                  name: e.target.value,

                }))

              }

              placeholder="Enter role name"

            />

          </div>


          {/* STATUS */}

          <div className="mb-3">

            <label className="form-label">
              Status
            </label>

            <select

              className="form-select"

              value={newRole.status}

              onChange={(e) =>

                setNewRole((prev) => ({

                  ...prev,

                  status: e.target.value,

                }))

              }

            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>


          {/* PERMISSIONS */}

          <h5 className="mb-3">
            Permissions
          </h5>


          <div className="table-responsive">

            <table className="table table-bordered">

              <thead className="table-light">

                <tr>

                  <th>
                    Module
                  </th>

                  {permissionTypes.map(
                    (permission) => (

                      <th
                        key={permission}
                        className="text-capitalize"
                      >
                        {permission}
                      </th>

                    )
                  )}

                </tr>

              </thead>


              <tbody>

                {modules.map((module) => (

                  <tr key={module}>

                    <td>

                      <strong className="text-capitalize">

                        {module}

                      </strong>

                    </td>


                    {permissionTypes.map(
                      (permission) => (

                        <td
                          key={permission}
                          className="text-center"
                        >

                          <input

                            type="checkbox"

                            className="form-check-input"

                            checked={
                              newRole
                                .permissions?.[module]?.[permission] || false
                            }

                            onChange={(e) =>

                              handlePermissionChange(

                                module,

                                permission,

                                e.target.checked

                              )

                            }

                          />

                        </td>

                      )
                    )}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* BUTTONS */}

          <div className="mt-3">

            <button

              className="btn btn-success me-2"

              onClick={saveRole}

            >

              {editingRole !== null

                ? "Save Changes"

                : "Add Role"

              }

            </button>


            <button

              className="btn btn-secondary"

              onClick={resetForm}

            >

              Cancel

            </button>

          </div>

        </div>

      )}


      {/* ROLES TABLE */}

      <div className="table-responsive">

        <table className="table table-bordered table-hover">

          <thead className="table-light">

            <tr>

              <th>
                Role
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {roles.map((role) => (

              <tr key={role._id}>

                <td>

                  <strong>
                    {role.name}
                  </strong>

                </td>


                <td>
                  {role.status || "Active"}
                </td>


                <td>

                  <button

                    className="btn btn-sm btn-primary me-2"

                    onClick={() =>
                      openEditRole(role)
                    }

                  >

                    Edit

                  </button>


                  <button

                    className="btn btn-sm btn-danger"

                    onClick={() =>
                      deleteRole(
                        role._id,
                        role.name
                      )
                    }

                    disabled={
                      role.name === "Super Admin"
                    }

                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ManageRoles;