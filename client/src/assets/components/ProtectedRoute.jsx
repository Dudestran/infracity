import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get(
            "http://localhost:5000/api/auth/check",
            {
                withCredentials: true
            }
        )
        .then((res) => {
            setAuthenticated(res.data.authenticated);
            setLoading(false);
        })
        .catch(() => {
            setAuthenticated(false);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;