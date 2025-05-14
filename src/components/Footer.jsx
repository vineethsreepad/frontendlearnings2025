import React from "react";  
import "../styles.css";

export default function Footer(){

    const curreentYear = new Date().getFullYear();

    return(
        <footer className="footer">
            <p className="footer-text">© {curreentYear} MovieDux. All rights reserved.</p>
        </footer>
    );
}