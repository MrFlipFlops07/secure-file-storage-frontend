import { signIn } from "aws-amplify/auth";
import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn({ username, password });
  
      // 🔐 TEMP role assignment (for demo)
      let role = "viewer";
      if (username === "admin") role = "admin";
      else role = "user";
  
      localStorage.setItem("loggedInUser", username);
      localStorage.setItem("userRole", role);
  
      onLogin(username);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;