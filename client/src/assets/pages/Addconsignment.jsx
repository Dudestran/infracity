import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const AddConsignment = () => {
  const [formData, setFormData] = useState({
    airwayBillNo: "",
    consignor: "",
    pickupDate: "",
    expectedDeliveryDate: "",
    status: "",
    networkName: "",
    receiverName: "",
    networkId: "",
    networkLink: "",
    from: "",
    pcs: "",
    weight: "",
    consigneeName: "",
    consigneeAddress: "",
    mode: "",
    destination: "",
   
  });
  const [consignors, setConsignors] = useState([]);

  useEffect(() => {
    getConsignors();
  }, []);

  const getConsignors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/consignors"
      );

      setConsignors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/consignments",
        formData
      );

      console.log("SUCCESS:", res.data);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error);
    }
  };

  return (
    <div className="consignment-container">
      <div className="consignment-card">
        <div className="container mt-4">
          <h2 className="consignment-title">
            Add Notes
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <label>Note Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="airwayBillNo"
                  onChange={handleChange}
                />
              </div>

             
              <div className="col-md-4">
                <label> Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="pickupDate"
                  onChange={handleChange}
                />
              </div>

            

              <div className="col-md-4">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="networkName"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>The Note</label>
                <input
                  type="texarea"
                  className="form-control"
                  name="receiverName"
                  onChange={handleChange}
                />
              </div>
              

              
              <div className="col-12">
                <Link to="/total-consignment">
                <button  className="btn btn-primary">
                  
                  Add Note
                </button>
                </Link>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddConsignment;