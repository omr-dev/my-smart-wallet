import { useAuth0 } from "@auth0/auth0-react";
import { FaSpinner } from "react-icons/fa";
import { Navigate } from "react-router-dom";

export const PageExpenses = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (!isLoading) {
    if (!isAuthenticated) {
      return <Navigate to="/home" replace />;
    } else {
      return (
        <div className="pageExpenses">
          <h2>This is expenses page.</h2>
        </div>
      );
    }
  } else {
    return (
      <div>
        <FaSpinner className="spinner" />
      </div>
    );
  }
};
