import { signOut } from "aws-amplify/auth";

function Logout({ onLogout }) {
  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("loggedInUser");
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;