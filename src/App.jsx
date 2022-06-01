import "./App.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { FaSpinner } from "react-icons/fa";
import ProfileBar from "./components/ProfileBar";
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="App">
      <h1>My Smart Wallet</h1>
      <ProfileBar />
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
}

export default App;
