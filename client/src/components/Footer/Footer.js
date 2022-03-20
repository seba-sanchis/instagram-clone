// Import
import React from "react";

import "./Footer.scss";

//Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
            <div className="footer-description">
                <div className="footer-description-link"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" rel="nofollow noopener noreferrer" target="_blank">JavaScript</a></div>
                <div className="footer-description-link"><a href="https://reactjs.org/" rel="nofollow noopener noreferrer" target="_blank">React</a></div>
                <div className="footer-description-link"><a href="https://redux.js.org/" rel="nofollow noopener noreferrer" target="_blank">Redux</a></div>
                <div className="footer-description-link"><a href="https://nodejs.org/en/" rel="nofollow noopener noreferrer" target="_blank">Node</a></div>
                <div className="footer-description-link"><a href="https://www.mongodb.com/" rel="nofollow noopener noreferrer" target="_blank">MongoDB</a></div>
                <div className="footer-description-link"><a href="https://sass-lang.com/" rel="nofollow noopener noreferrer" target="_blank">Sass</a></div>
            </div>
            <div className="footer-description">
                <div className="footer-description-link"><a href="https://github.com/seba-sanchis/social-media" rel="nofollow noopener noreferrer" target="_blank">Github</a></div>
                <div className="footer-description-link"><a href="https://www.linkedin.com/in/sebastian-sanchis/" rel="nofollow noopener noreferrer" target="_blank">LinkedIn</a></div>
                <div className="footer-description-link"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=seba.sanchis@gmail.com" rel="nofollow noopener noreferrer" target="_blank">E-mail</a></div>
            </div>
        </div>
        <div className="footer-project">
            <div className="footer-project-description">Buenos Aires, Argentina</div>
            <div className="footer-project-description">© 2022 Social media project from seba-sanchis</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
