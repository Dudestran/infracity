import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const logout = async () => {

            await axios.post(
                "http://localhost:5000/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            );

            navigate("/login");

        };

        logout();

    }, []);

    return (
        <h3 className="text-center mt-5">
            Logging out...
        </h3>
    );

};

export default Logout;