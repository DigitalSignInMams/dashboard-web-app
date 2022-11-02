import { useEffect } from "react";
import { useNavigate } from "react-router";
import { logout } from "../../../Firebase";



function LogoutPage() {
    
    const navigate = useNavigate();

    useEffect(() => {
        
        logout();

        
        window.location.reload(true);
        navigate("/");
    },[navigate]);

    return (
        <></>
    );
}

export default LogoutPage;