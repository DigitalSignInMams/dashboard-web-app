import { useEffect } from "react";
import { useNavigate } from "react-router";
import { logout } from "../../../Firebase";



function LogoutPage() {
    
    const navigate = useNavigate();
    logout();

    useEffect(() => {
      
        logout();
        navigate("/");
        
        

        
     
        
    
    },[navigate]);

    return (
        <></>
    );
}

export default LogoutPage;