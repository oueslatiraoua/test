import { useEffect } from "react";

import "./homepage.css";

import { FormHelperText, FormControl, FormLabel } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/userSlice";
import Navbar from "./Navbar";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, errors } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuth) navigate("/OurServices");
  }, [isAuth]);
  const loginInput = (data) => {
    console.log(data);
    dispatch(login(data));
  };
  return (
    <div>
      <Navbar />

      <div className="main">
        <div className="card">
          <div className="card-body">
            <div className="card-body-top">
              <button id="login" className="btn" name="login">
                SIGN IN
              </button>
            </div>

            <div className="card-body-login">
              <form id="login-form" onSubmit={handleSubmit(loginInput)}>
                <input
                  className="input-form"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "email is required",
                  })}
                />

                <br />
                <br />
                <input
                  className="input-form"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
                <FormControl>
                  <FormHelperText
                    style={{
                      color: "white",
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "start",
                      padding: "10px",
                    }}
                  >
                    {" "}
                    {errors && errors.msg}
                  </FormHelperText>
                </FormControl>

                <br />
                <br />
                <br />

                <input className="submit-form" type="submit" value="Sign in" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
