import { useEffect } from "react";
import { useNavigate } from "react-router";
import { logout } from "../../../Firebase";



function LogoutPage() {
    
    const navigate = useNavigate();

    useEffect(() => {
        
        logout();

        navigate("/dashboard");
        window.location.reload(true);
    },[navigate]);

    return (
        <></>
    );
}

export default LogoutPage;