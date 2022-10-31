import { useEffect } from "react";
import { useNavigate } from "react-router";
import { logout } from "../../../Firebase";



function LogoutPage() {
    
    const navigate = useNavigate();

    useEffect(() => {
        alert("logout");
        logout();

        navigate("/dashboard");
    },[navigate]);

    return (
        <></>
    );
}

export default LogoutPage;