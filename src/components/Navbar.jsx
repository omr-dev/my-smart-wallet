import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import BtnLogin from "./BtnLogin";
import BtnLogout from "./BtnLogout";
const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="navbar">
      <nav className="navbar-inner">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/expenses">Expenses</NavLink>
            </li>
          )}
        </ul>
        {isAuthenticated ? <BtnLogout /> : <BtnLogin />}
      </nav>
    </div>
  );
};
export default Navbar;
