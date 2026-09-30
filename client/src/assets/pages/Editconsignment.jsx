import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



const EditConsignment = () => {
  
    const { id } = useParams();
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

  useEffect(() => {
  getConsignment();
}, []);

const getConsignment = async () => {
  try {

    const res = await axios.get(
      `http://localhost:5000/api/consignments/${id}`
    );

    setFormData({
  ...res.data,

  pickupDate:
    res.data.pickupDate
      ?.split("T")[0],

  expectedDeliveryDate:
    res.data.expectedDeliveryDate
      ?.split("T")[0],
});

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

  try {

    await axios.put(
      `http://localhost:5000/api/consignments/${id}`,
      formData
    );

    alert("Updated Successfully");

    navigate("/manage-consignment");

  } catch(error) {

    console.log(error);

  }

};
  return (
    <div className="consignment-container">
      <div className="consignment-card">
        <div className="container mt-4">
          <h2 className="consignment-title">
            Edit Consignment
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <label>Airway Bill No</label>
                <input
                  type="text"
                  className="form-control"
                  name="airwayBillNo"
                  onChange={handleChange}
                  value={formData.airwayBillNo || ""}
                />
              </div>

              <div className="col-md-4">
                <label>Consignor</label>

                <select
                  className="form-control"
                  name="consignor"
                  value={formData.consignor || ""}
                  onChange={handleChange}
                >
                  

                  {consignors.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                    >
                      {item.clientName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>Pickup Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="pickupDate"
                  onChange={handleChange}
                  value={formData.pickupDate || ""}
                  
                />
              </div>

              <div className="col-md-4">
                <label>Expected Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="expectedDeliveryDate"
                  onChange={handleChange}
                    value={formData.expectedDeliveryDate || ""}
                />
              </div>

              <div className="col-md-4">
                <label>Status</label>
                <select
                  className="form-control"
                  name="status"
                  onChange={handleChange}
                  value={formData.status || ""}
                >
                  <option>Select Status</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Network Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="networkName"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Receiver Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="receiverName"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Network ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="networkId"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Network Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="networkLink"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>From</label>
                <input
                  type="text"
                  className="form-control"
                  name="from"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <label>Pcs</label>
                <input
                  type="number"
                  className="form-control"
                  name="pcs"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <label>Weight</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Consignee Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="consigneeName"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Consignee Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="consigneeAddress"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Mode</label>
                <select
                  className="form-control"
                  name="mode"
                  onChange={handleChange}
                  value={formData.mode || ""}
                >
                  <option>Select Mode</option>
                  <option>Air</option>
                  <option>Road</option>
                  <option>Rail</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Destination</label>
                <input
                  type="text"
                  className="form-control"
                  name="destination"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <Link to="/total-consignment">
                <button  className="btn btn-primary" onClick={handleSubmit}>
                  
                  Edit Consignment
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

export default EditConsignment;