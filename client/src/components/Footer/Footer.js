// Import
import React from "react";

import "./Footer.scss";

//Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
            <div className="footer-technologies">
                <div>JavaScript</div>
                <div>React</div>
                <div>Redux</div>
                <div>Node</div>
                <div>MongoDB</div>
                <div>Sass</div>
            </div>
            <div className="footer-contact">
                <div>Github</div>
                <div>LinkedIn</div>
                <div>E-mail</div>
            </div>
        </div>
        <div className="footer-project">
            <div>Buenos Aires, Argentina</div>
            <div>2022 Social media project</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
