import React, { useState } from "react";
import axios from "axios";

const UpdateConsignment = () => {
  const [consignmentId, setConsignmentId] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `/api/consignments/${consignmentId}`
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="consignment-container">
    <div className="consignment-card">
    <div className="container mt-4">
      <h2 className="consignment-title">
        Update Consignment
      </h2>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consignment ID"
            value={consignmentId}
            onChange={(e) =>
              setConsignmentId(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default UpdateConsignment;