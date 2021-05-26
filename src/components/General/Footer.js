import React from "react";
import env from "react-dotenv";

import "./Footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-buttons">
            </div>
            <div className="footer-general">
                <p>Created by LegenDarius</p>
                <p>Version: {env.VERSION}</p>
            </div>
        </div>
    );
};

export default Footer;
