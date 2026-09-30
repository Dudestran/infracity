import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ManageConsignors.css";

const TotalConsignors = () => {

    const [consignors, setConsignors] = useState([]);
    const [search, setSearch] = useState("");

    // =========================
    // FETCH CONSIGNORS
    // =========================

    const fetchConsignors = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/consignors",
                {
                    withCredentials: true
                }
            );

            console.log("Consignors received:", res.data);

            setConsignors(res.data);

        } catch (error) {

            console.error(
                "Error fetching consignors:",
                error
            );

        }

    };


    // =========================
    // LOAD WHEN PAGE OPENS
    // =========================

    useEffect(() => {

        fetchConsignors();

    }, []);


    // =========================
    // TOGGLE STATUS
    // =========================

    const toggleStatus = async (item) => {

        const newStatus =
            item.status === "Active"
                ? "Inactive"
                : "Active";

        try {

            await axios.put(
                `http://localhost:5000/api/consignors/${item._id}`,
                {
                    status: newStatus
                },
                {
                    withCredentials: true
                }
            );

            // Reload list
            fetchConsignors();

        } catch (error) {

            console.error(
                "Error updating consignor:",
                error
            );

        }

    };


    // =========================
    // SEARCH
    // =========================

    const filteredConsignors = consignors.filter((item) => {

        const clientName =
            item.clientName?.toLowerCase() || "";

        const clientCode =
            item.clientCode?.toLowerCase() || "";

        const city =
            item.city?.toLowerCase() || "";

        const searchValue =
            search.toLowerCase();

        return (
            clientName.includes(searchValue) ||
            clientCode.includes(searchValue) ||
            city.includes(searchValue)
        );

    });


    // =========================
    // JSX
    // =========================

    return (

        <div className="manage-consignor">

            <div className="header">

                <h2>
                    Total Consignor
                </h2>

                <Link to="/add-consignor">

                    <button className="add-btn">
                        Add
                    </button>

                </Link>

            </div>


            <div className="table-card">

                <div className="table-top">

                    <div>

                        Show

                        <select>

                            <option>10</option>
                            <option>25</option>
                            <option>50</option>

                        </select>

                        entries

                    </div>


                    <div className="search-box">

                        Search:

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>


                <table>

                    <thead>

                        <tr>

                            <th></th>

                            <th>
                                Client Code
                            </th>

                            <th>
                                Client Name
                            </th>

                            <th>
                                Address
                            </th>

                            <th>
                                City
                            </th>

                            <th>
                                Phone No
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Edit
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredConsignors.map((item) => (

                            <tr key={item._id}>

                                <td>
                                    <input
                                        type="checkbox"
                                    />
                                </td>

                                <td>
                                    {item.clientCode}
                                </td>

                                <td>
                                    {item.clientName}
                                </td>

                                <td>
                                    {item.clientAddress1}
                                </td>

                                <td>
                                    {item.city}
                                </td>

                                <td>
                                    {item.phoneNo}
                                </td>

                                <td>

                                    <span
                                        className={
                                            item.status === "Active"
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            toggleStatus(item)
                                        }
                                    >
                                        Edit
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

export default TotalConsignors;