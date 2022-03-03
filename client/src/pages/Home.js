import React from "react";
import Navbar from "./Navbar";

import "./homepage.css";

import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <div className="main">
        <div></div>
      </div>

      <footer className="endOfPage">
        <div class="footer-bottom">
          <ul class="socials">
            <li>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>

          <p>copyright &copy;2022 freelance</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
