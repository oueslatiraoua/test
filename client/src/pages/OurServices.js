import "./homepage.css";

import CardList from "../components/CardList";
import { Link } from "react-router-dom";

const OurServices = () => {
  return (
    <>
      <div className="navbarAboutUs">
        <div className="logo">
          <Link to="/"> Go to home page ! </Link>
        </div>
      </div>
      <div className="mainCard">
        <div>
          <CardList />
        </div>
      </div>
    </>
  );
};
export default OurServices;
