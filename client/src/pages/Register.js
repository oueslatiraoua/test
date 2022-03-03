import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

import "./homepage.css";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  register as registerAction,
  registerFreelancer,
} from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 100,
};
function Register() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //UseForm for user

  const {
    register: userRegister,
    handleSubmit: handleSubmitUser,
    formState: { errors: userErrors },
    reset,
  } = useForm();
  //UseForm for freelancer

  const {
    register: freelancerRegister,
    handleSubmit: handleSubmitFreelancer,
    formState: { errors: freelancerErrors },
    reset: resetFree,
  } = useForm();

  const { isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuth) navigate("/OurServices");
  }, [isAuth]);

  // user Action
  const [photo, setPhoto] = useState({});
  const inputInfo = (data) => {
    console.log(data);
    dispatch(
      registerAction({
        info: { ...data, contact: +data.contact, role: "user" },

        photo,
      })
    );
  };
  // freelancer Action

  const inputInfoFree = (data) => {
    console.log(data);

    dispatch(
      registerFreelancer({
        info: { ...data, contact: +data.contact, role: "freelancer" },

        photo,
      })
    );
  };

  return (
    <div>
      <Navbar />
      <div className="main"></div>
      <div>
        <div className="card">
          <div className="card-title">
            <h3>
              {toggle === false ? (
                <>
                  {" "}
                  <i
                    className="fa fa-user-circle-o"
                    aria-hidden="true"
                  ></i>{" "}
                  User
                  <span id="action_title">register</span>
                </>
              ) : (
                <>
                  {" "}
                  <i
                    className="fa fa-user-circle-o"
                    aria-hidden="true"
                  ></i>{" "}
                  Freelancer
                  <span id="action_title">register</span>
                </>
              )}
            </h3>
          </div>
          <div className="card-body">
            <div className="card-body-top">
              <button
                id="login"
                className="btn"
                name="login"
                onClick={() => {
                  setToggle(false);
                  reset();
                }}
              >
                Register as User
              </button>

              <button
                id="register"
                className="btn"
                name="register"
                onClick={() => {
                  setToggle(true);
                  resetFree();
                }}
              >
                Register as Freelancer
              </button>
            </div>
            <div className="card-body-login">
              {toggle ? (
                <form
                  id="register-form"
                  onSubmit={handleSubmitFreelancer(inputInfoFree)}
                >
                  <input
                    className="input-form"
                    type="name"
                    placeholder="Enter your full name"
                    {...freelancerRegister("name", {
                      required: "Your name is missing",
                    })}
                  />
                  <br />
                  <br />

                  <label
                    className="input-form"
                    style={{
                      color: "gray",
                      opacity: "0.9",
                    }}
                  >
                    <input
                      placeholder="Enter your photo "
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    Profile Photo...
                  </label>
                  <br />
                  <br />
                  <input
                    className="input-form"
                    placeholder="Enter your contact "
                    {...freelancerRegister("contact", {
                      required: "Please put your contact number",
                      minLength: {
                        value: 8,
                        message: "your contact should be composed of 8 numbers",
                      },
                    })}
                  />
                  <br />
                  <br />
                  <input
                    className="input-form"
                    type="text"
                    placeholder="Please put your linkedin address "
                    {...freelancerRegister("linkedin")}
                  />
                  <br />
                  <br />
                  <input
                    className="input-form"
                    type="text"
                    placeholder="Enter your freelance service"
                    {...freelancerRegister("service", { required: true })}
                  />
                  <br />
                  <br />
                  <input
                    className="input-form"
                    placeholder="Enter your email"
                    {...freelancerRegister("email", {
                      required: "Please put your email address",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "you should put a valid email",
                      },
                    })}
                  />
                  <br />
                  <br />
                  <input
                    className="input-form"
                    type="password"
                    placeholder="Enter your password"
                    {...freelancerRegister("password", {
                      required: "password is required",
                    })}
                  />

                  <br />
                  <br />
                  <input
                    className="submit-form"
                    type="submit"
                    value="Register"
                    onClick={freelancerErrors && handleOpen}
                  />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        <p style={{ color: "red", marginTop: "20px" }}>
                          {freelancerErrors.name &&
                            freelancerErrors.name.message}
                        </p>
                        <p style={{ color: "red", marginTop: "20px" }}>
                          {freelancerErrors.contact &&
                            freelancerErrors.contact.message}
                        </p>

                        <p style={{ color: "red", marginTop: "20px" }}>
                          {freelancerErrors.email &&
                            freelancerErrors.email.message}
                        </p>
                        <p style={{ color: "red", marginTop: "20px" }}>
                          {freelancerErrors.password &&
                            freelancerErrors.password.message}
                        </p>
                      </Typography>
                    </Box>
                  </Modal>
                </form>
              ) : (
                <form id="login-form" onSubmit={handleSubmitUser(inputInfo)}>
                  <input
                    className="input-form"
                    type="text"
                    placeholder="Enter your full name"
                    {...userRegister("name", { required: true })}
                    required
                  />
                  <br />
                  <br />
                  <input
                    className="input-form"
                    placeholder="Enter your contact"
                    {...userRegister("contact", {
                      required: "Please put your contact number",
                      minLength: {
                        value: 8,
                        message: "your contact should be composed of 8 numbers",
                      },
                    })}
                  />
                  <br />
                  <br />
                  <label
                    className="input-form"
                    style={{
                      color: "gray",
                      opacity: "0.9",
                    }}
                  >
                    <input
                      placeholder="Enter your photo"
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    Profile Photo...
                  </label>
                  <br />
                  <br />
                  <input
                    className="input-form"
                    placeholder="Enter your email"
                    {...userRegister("email", {
                      required: "Please put your email address",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "you should put a valid email",
                      },
                    })}
                  />
                  <br />
                  <br />
                  <input
                    className="input-form"
                    type="password"
                    placeholder="Enter your password"
                    {...userRegister("password", {
                      required: "Please enter your password",
                    })}
                  />
                  <br />
                  <br />
                  <br />
                  <input
                    className="submit-form"
                    type="submit"
                    value="Register"
                    onClick={handleOpen}
                  />

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        <p style={{ color: "red", marginTop: "20px" }}>
                          {userErrors.contact && userErrors.contact.message}
                        </p>
                        <p style={{ color: "red", marginTop: "20px" }}>
                          {userErrors.password && userErrors.password.message}
                        </p>
                        <p style={{ color: "red", marginTop: "20px" }}>
                          {userErrors.email && userErrors.email.message}
                        </p>
                      </Typography>
                    </Box>
                  </Modal>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
