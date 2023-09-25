/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiSolidUserRectangle } from "react-icons/bi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FaMobile } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../helper/helper";

function SignUoFrom() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPw, setShowPw] = React.useState({
    password: true,
    cPassword: true,
  });
  const [error, setError] = React.useState<any>(null);

  const [fromData, setFromData] = React.useState({
    fullName: "",
    email: "",
    mobileNo: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFromData({ ...fromData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    register(fromData)
      .then((data: any) => {
        setError(null);
        toast.success(data?.message);
        navigate("/login");
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
    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
      <Toaster />
      <label className="form-label" htmlFor="form3Example1c">
        Your Full Name
      </label>
      <div className="d-flex flex-column  mb-1">
        <div className="form-outline d-flex align-items-center gap-2 mb-0">
          <BiSolidUserRectangle size={32} />

          <input
            type="text"
            id="form3Example1c"
            name="fullName"
            value={fromData.fullName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <p className="text-danger text-sm fw-bold">
          {error && error?.fullName ? error.fullName?.message : ""}
        </p>
      </div>

      <div className="d-flex flex-column  mb-1">
        <label className="form-label" htmlFor="form3Example3c">
          Your Email
        </label>
        <div className="form-outline d-flex align-items-center gap-2 mb-0">
          <MdMarkEmailRead size={32} />

          <input
            type="email"
            name="email"
            value={fromData.email}
            onChange={handleChange}
            id="form3Example3c"
            className="form-control"
          />
        </div>
        <p className="text-danger text-sm fw-bold">
          {error && error?.email ? error.email?.message : ""}
        </p>
      </div>

      <div className="d-flex flex-column mb-1">
        <label className="form-label" htmlFor="form3Example3cMobile">
          Mobile No
        </label>
        <div className="form-outline d-flex align-items-center gap-2 mb-0">
          <FaMobile size={24} />

          <input
            type="text"
            name="mobileNo"
            value={fromData.mobileNo}
            onChange={handleChange}
            id="form3Example3cMobile"
            className="form-control"
          />
        </div>
        <p className="text-danger text-sm fw-bold">
          {error && error?.mobileNo ? error.mobileNo?.message : ""}
        </p>
      </div>

      <div className="d-flex flex-column mb-1">
        <label className="form-label" htmlFor="form3Example4c">
          Password
        </label>
        <div className="form-outline d-flex align-items-center gap-2 mb-0">
          {showPw.password ? (
            <BsEyeSlashFill
              size={24}
              onClick={() => setShowPw({ ...showPw, password: false })}
            />
          ) : (
            <BsEyeFill
              size={24}
              onClick={() => setShowPw({ ...showPw, password: true })}
            />
          )}
          <input
            type={showPw.password ? "text" : "password"}
            name="password"
            value={fromData.password}
            onChange={handleChange}
            id="form3Example4c"
            className="form-control"
          />
        </div>
        <p className="text-danger text-sm fw-bold">
          {error && error?.password ? error.password?.message : ""}
        </p>
      </div>

      <div className="d-flex flex-column mb-1">
        <label className="form-label" htmlFor="form3Example4cd">
          Confirm your password
        </label>
        <div className="form-outline d-flex align-items-center gap-2 mb-0">
          {showPw.cPassword ? (
            <BsEyeSlashFill
              size={24}
              onClick={() => setShowPw({ ...showPw, cPassword: false })}
            />
          ) : (
            <BsEyeFill
              size={24}
              onClick={() => setShowPw({ ...showPw, cPassword: true })}
            />
          )}
          <input
            type={showPw.cPassword ? "text" : "password"}
            name="cPassword"
            value={fromData.cPassword}
            onChange={handleChange}
            id="form3Example4cd"
            className="form-control"
          />
        </div>
        <p className="text-danger text-sm fw-bold">
          {error && error?.cPassword ? error.cPassword?.message : ""}
        </p>
      </div>
      <br />
      <div className="d-flex justify-content-start mx-4 ">
        <button type="submit" className="btn btn-primary btn-lg">
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </div>

      <div className="form-check d-flex justify-content-center mb-5">
        <p className="text-center text-muted mt-5 mb-0">
          Have already an account?{" "}
          <NavLink to={`/login`} className="fw-bold text-body">
            <u>Login here</u>
          </NavLink>
        </p>
      </div>
    </form>
  );
}

export default SignUoFrom;
