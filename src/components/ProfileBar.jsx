import { useAuth0 } from "@auth0/auth0-react";
import BtnLogin from "./BtnLogin";
import BtnLogout from "./BtnLogout";
const ProfileBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="profileBar">
      {isLoading ? (
        <p>User details loading...</p>
      ) : (
        <p>
          {isAuthenticated && `You have as ${user.email} einlogged. `}
          {isAuthenticated ? <BtnLogout /> : <BtnLogin />}
        </p>
      )}
    </div>
  );
};
export default ProfileBar;
