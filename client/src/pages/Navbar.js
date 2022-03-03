import * as React from "react";
import PostModal from "../components/PostModal";
import { ChakraProvider } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import "./homepage.css";
import Img from "./Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";

export default function Navbar() {
  const { isAuth } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.user);

  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={
          location.pathname === "/OurServices" ||
          location.pathname === "/AboutUs"
            ? "navbarOurServices"
            : "navbar"
        }
      >
        <div className="menu">
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>

            <li>
              <Link to="/OurServices">OUR SERVICES</Link>
            </li>
            {!isAuth ? (
              <>
                <li>
                  <Link to="/Login">SIGN IN</Link>
                </li>
                <li>
                  <Link to="/Register">JOIN US</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(logout())}
                  >
                    LOGOUT
                  </p>
                </li>
              </>
            )}

            {location.pathname === "/OurServices" ? (
              userInfo.role === "freelancer" ? (
                <li>
                  <ChakraProvider>
                    <PostModal check={false} />
                  </ChakraProvider>
                </li>
              ) : null
            ) : location.pathname === "/" ? (
              <div className="search">
                <input
                  className="src"
                  type="search"
                  placeholder="Find services"
                />
                <button className="btn">
                  <i className="fas fa-search" style={{ padding: "4px" }} />
                  Search
                </button>
              </div>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
