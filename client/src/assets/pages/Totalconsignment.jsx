import React, { useEffect, useState } from "react";
import "./ManageConsignment.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";


const TotalConsignment = () => {
  const [consignments, setConsignments] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [permissions, setPermissions] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    if (permissions?.view) {
      fetchConsignments();
    }
  }, [currentPage, limit, permissions]);


  const checkPermissions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/check",
        {
          withCredentials: true
        }
      );

      console.log("Auth response:", res.data);

      setPermissions(
        res.data.user?.permissions?.consignment || {
          view: false,
          add: false,
          edit: false,
          delete: false,
          import: false,
          export: false
        }
      );

    } catch (error) {
      console.log(error);

      navigate("/login");
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);
  const getPageNumbers = () => {
    const pages = [];

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  const fetchConsignments = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/consignments?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true
        }
      );
      setConsignments(
        res.data.consignments
      );

      setTotalPages(
        res.data.totalPages
      );

    } catch (error) {

      console.log(error);

    }

  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const exportToExcel = () => {
    const data = consignments.map((item) => ({
      "Airway Bill": item.airwayBillNo,
      "Pickup Date": item.pickupDate,
      Origin: item.origin,
      Destination: item.destination,
      Consignor:
        item.consignor?.clientName ||
        item.consignor ||
        "",
      Status: item.status,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Consignments"
    );

    XLSX.writeFile(
      workbook,
      "Consignments.xlsx"
    );
  };

  const importExcel = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {

      const data = e.target.result;

      const workbook =
        XLSX.read(data, {
          type: "binary",
        });

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const jsonData =
        XLSX.utils.sheet_to_json(
          worksheet
        );



      try {

        await axios.post(
          "http://localhost:5000/api/consignments/import",
          jsonData,
          {
            withCredentials: true
          }
        );

        alert("Imported Successfully");

        fetchConsignments();

      } catch (error) {

        console.log(error);

      }
    };

    reader.readAsBinaryString(file);
  };
  const filtered = consignments.filter((item) =>
    item.airwayBillNo
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
  if (permissions === null) {
    return <div>Loading...</div>;
  }

  if (!permissions.view) {
    return (
      <div className="manage-container">
        <h2>You do not have permission to view consignments.</h2>
      </div>
    );
  }
  return (
    <div className="manage-container">

      <div className="top-heading">

        <h2>Your Notes</h2>


        {permissions?.add && (
          <Link to="/add-consignment">
            <button className="add-btn">
              Add
            </button>
          </Link>
        )}
        
      </div>

    </div>
  );
};

export default TotalConsignment;