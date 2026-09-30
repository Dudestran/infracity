import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddConsignor = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientCode: "",
    clientName: "",
    clientAddress1: "",
    clientAddress2: "",
    city: "",
    phoneNo: "",
    status: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Submitting consignor...");
    console.log("Form data:", formData);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/consignors",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Add consignor response:", res.data);

      alert("Consignor added successfully");

      // Go back to consignor list AFTER successful POST
      navigate("/total-consignor");

    } catch (error) {

      console.error(
        "Error adding consignor:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to add consignor"
      );

    }

  };


  return (

    <div className="consignment-container">

      <div className="consignment-card">

        <div className="container mt-4">

          <h2 className="consignment-title">
            Add Consignor
          </h2>


          <form onSubmit={handleSubmit}>

            <div className="row g-3">


              <div className="col-md-4">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Client Code"
                  name="clientCode"
                  value={formData.clientCode}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="col-md-4">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Client Name"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="col-md-4">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Client Address 1"
                  name="clientAddress1"
                  value={formData.clientAddress1}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="col-md-4">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Client Address 2"
                  name="clientAddress2"
                  value={formData.clientAddress2}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-4">

                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="col-md-4">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone No"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="col-md-4">

                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Status
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>


              <div className="col-12">

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Consignor
                </button>

              </div>


            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AddConsignor;