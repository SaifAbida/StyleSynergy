import "./NavBar.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "info",
      title: "Logged out successfuly",
    });
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid">
        <Link className="navbar-brand ps-5" to="/">
          STYLESYNERGY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {token && (
              <li className="nav-item">
                <Cart />
              </li>
            )}
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link ps-3" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ps-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link ps-3" to="/settings">
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link ps-3"
                    to="/login"
                    onClick={handleClick}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle ps-3 me-5"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/women">
                    Women's Fashion
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/men">
                    Men's Fashion
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/children">
                    Children Clothing
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
