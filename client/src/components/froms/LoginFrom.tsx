/* eslint-disable @typescript-eslint/no-explicit-any */
import JsCookie from "js-cookie";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../helper/helper";
import { setAuth, setToken } from "../../redux/sclice/authSlice";

function LoginFrom() {
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<any>(null);
  const [showPw, setShowPw] = React.useState(true);
  const [fromData, setFromData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFromData({ ...fromData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    login(fromData)
      .then((data: any) => {
        setError(null);
        toast.success(data?.message);
        navigate("/");
        JsCookie.set("client_user-token", data?.token, {
          expires: 1000 * 60 * 60 * 24 * 10,
          secure: true,
        });
        disPatch(setAuth({ user: data.user }));
        disPatch(setToken(data?.token));
      })
      .catch((error) => {
        toast.error("Filed try again..!");
        setError(error?.response?.data?.error);
        // console.log(error?.response?.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <div className="d-flex align-items-center mb-3 pb-1">
        <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
        <span className="h1 fw-bold mb-0">Logo</span>
      </div>

      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
        Sign into your account
      </h5>

      <div className="form-outline mb-1">
        <input
          type="email"
          name="email"
          id="form2Example17"
          className="form-control form-control-lg"
          onChange={handleChange}
          value={fromData.email}
        />
        <MdAlternateEmail className=" d-inline-flex" />
        <label className="form-label ml-2" htmlFor="form2Example17">
          Email address
        </label>
        <p className="text-danger text-sm fw-bold">
          {error && error?.email ? error?.email?.message : ""}
        </p>
      </div>

      <div className="form-outline mb-1">
        <input
          type={showPw ? "text" : "password"}
          name="password"
          id="form2Example27"
          className="form-control form-control-lg"
          onChange={handleChange}
          value={fromData.password}
        />
        {showPw ? (
          <BsEyeSlashFill size={24} onClick={() => setShowPw(false)} />
        ) : (
          <BsEyeFill size={24} onClick={() => setShowPw(true)} />
        )}
        <label className="form-label ml-2 " htmlFor="form2Example27">
          Password
        </label>
        <p className="text-danger text-sm fw-bold">
          {error && error?.password ? error.password?.message : ""}
        </p>
      </div>
      <p className="text-danger text-sm fw-bold text-center">
        {error && error?.errorMsg}
      </p>
      <div className="pt-1 mb-4">
        <button className="btn btn-dark btn-lg btn-block" type="submit">
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </div>

      <a className="small text-muted" href="#!">
        Forgot password?
      </a>
      <br />
      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
        Don't have an account?
        <NavLink to={`/signUp`} style={{ color: "#393f81" }}>
          Register here
        </NavLink>
      </p>
    </form>
  );
}

export default LoginFrom;
