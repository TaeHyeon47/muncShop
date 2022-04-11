/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-col">
          <Link className="footer-logo" to="#">
            munc
          </Link>
          <ul className="social-links">
            <li>
              <Link className="footer-link" to="#">
                <ion-icon class="social-icon" name="logo-instagram"></ion-icon>
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="#">
                <ion-icon class="social-icon" name="logo-facebook"></ion-icon>
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="#">
                <ion-icon
                  class="social-icon"
                  name="logo-twitter"
                  target="_blank"
                  rel="noreferrer"
                ></ion-icon>
              </Link>
            </li>
          </ul>
          <p className="copyright">
            Copyright &copy; {currentYear} by munc, Inc. All rights reserved.
          </p>
        </div>

        <div className="address-col">
          <p className="footer-heading">Contact us</p>
          <address className="contacts">
            <p className="address">
              서울특별시 서초구 서초대로 38길 12 (서초동 뭉크 타워 12층)
            </p>
            <p>
              <Link className="footer-link" to="tel:010-7207-7963">
                010-7207-7963
              </Link>
              <br />
              <Link className="footer-link" to="mailto:hillskuti@naver.com">
                hillskuti@naver.com
              </Link>
            </p>
          </address>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Account</p>
          <ul className="footer-nav">
            <Link className="footer-link" to="/register">
              Create account
            </Link>
            <Link className="footer-link" to="/login">
              Login
            </Link>
            <Link className="footer-link" to="#">
              iOS app
            </Link>
            <Link className="footer-link" to="#">
              Android app
            </Link>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Brand</p>
          <ul className="footer-nav">
            <Link className="footer-link" to="#">
              About munc
            </Link>
            <Link className="footer-link" to="#">
              munc Story
            </Link>
            <Link className="footer-link" to="#">
              Reservation
            </Link>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Help center</p>
          <ul className="footer-nav">
            <Link className="footer-link" to="#">
              Find Store
            </Link>
            <Link className="footer-link" to="#">
              Beautizen
            </Link>
            <Link className="footer-link" to="#">
              Q&A
            </Link>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
