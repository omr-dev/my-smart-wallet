import { useAuth0 } from "@auth0/auth0-react";
import { FaSpinner } from "react-icons/fa";
export const PageHome = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="pageHome">
      {isLoading ? (
        <div>
          <FaSpinner className="spinner" />
        </div>
      ) : isAuthenticated ? (
        <h2 className="loginMessageBox">{`Welcome, ${user.email} !`}</h2>
      ) : (
        <h2 className="loginMessageBox">Please log in to My Smart Wallet.</h2>
      )}
    </div>
  );
};
