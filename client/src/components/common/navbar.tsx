import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import Jscookie from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { setAuth, setToken } from "../../redux/sclice/authSlice";

function NavBar() {
  const disPatch= useDispatch();
  const { isAuthorized, user } = useSelector(
    (state: RootState) => state.authReducer
  );
  const logOut = () => {
    disPatch(setAuth(""));
    disPatch(setToken(null));
    Jscookie.remove("user-token", { path: "/", domain: "localhost" });
    Jscookie.remove("client_user-token", { path: "/", domain: "localhost" });

    toast.success("Logout SuccessFull.");
  };
  return (
    <>
      {/*  Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
        <Toaster />
        <a href="index.html" className="navbar-brand">
          <h1 className="m-0 text-primary">
            <i className="fa fa-book-reader me-3"></i>Kider
          </h1>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-auto">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                ` nav-item nav-link ${
                  isPending ? "pending" : isActive ? "active" : ""
                }  `
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                ` nav-item nav-link ${
                  isPending ? "pending" : isActive ? "active" : ""
                }  `
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/classes"
              className={({ isActive, isPending }) =>
                ` nav-item nav-link ${
                  isPending ? "pending" : isActive ? "active" : ""
                }  `
              }
            >
              classNamees
            </NavLink>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu rounded-0 rounded-bottom border-0 shadow-sm m-0">
                <NavLink to="/facility" className="dropdown-item">
                  School Facilities
                </NavLink>
                <NavLink to="/team" className="dropdown-item">
                  Popular Teachers
                </NavLink>
                <a href="call-to-action.html" className="dropdown-item">
                  Become A Teachers
                </a>
                <a href="appointment.html" className="dropdown-item">
                  Make Appointment
                </a>
                <a href="testimonial.html" className="dropdown-item">
                  Testimonial
                </a>
                <a href="404.html" className="dropdown-item">
                  404 Error
                </a>
              </div>
            </div>
            <NavLink
              to="/contact-us"
              className={({ isActive, isPending }) =>
                ` nav-item nav-link ${
                  isPending ? "pending" : isActive ? "active" : ""
                }  `
              }
            >
              Contact Us
            </NavLink>
          </div>
          {isAuthorized ? (
            <>
              <img
                src={user?.avatar}
                className="rounded-circle shadow-4 "
                style={{ width: "50px" }}
                alt="Avatar"
              />
              <span className=" p-2">{user?.fullName}</span>
              <FiLogOut className={" "} type="button" onClick={logOut} />
            </>
          ) : (
            <div className=" gap-2 d-flex flex-column flex-lg-row">
              <NavLink
                to="/login"
                className="btn btn-primary rounded-pill px-3 "
              >
                Login
              </NavLink>
              <NavLink
                to="/signUp"
                className="btn btn-primary rounded-pill px-3"
              >
                Sing Up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}

export default NavBar;
