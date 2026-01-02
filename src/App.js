import { useEffect, useState } from "react";

import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";

import Upload from "./components/Files/Upload";
import FileList from "./components/Files/FileList";
import DownloadHistory from "./components/Files/DownloadHistory";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [history, setHistory] = useState([]);

  // 🔹 Restore session on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const storedRole = localStorage.getItem("userRole");

    if (storedUser) {
      setUser(storedUser);
      setRole(storedRole);
    }
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {user ? (
        <>
          <h2>Welcome, {user}</h2>
          <p>
            <strong>Role:</strong> {role}
          </p>

          {/* 🔹 Upload allowed for admin & user */}
          {(role === "admin" || role === "user") && (
            <>
              <Upload />
              <br />
            </>
          )}

          {/* 🔹 File list with download tracking */}
          <FileList
            role={role}
            onDownload={(fileName) => {
              setHistory((prev) => [
                {
                  fileName,
                  user,
                  time: new Date().toLocaleString(),
                },
                ...prev,
              ]);
            }}
          />

          <br />

          {/* 🔹 Download history */}
          <DownloadHistory history={history} />

          <br />

          {/* 🔹 Logout */}
          <Logout
            onLogout={() => {
              localStorage.clear();
              setUser(null);
              setRole(null);
              setHistory([]);
            }}
          />
        </>
      ) : (
        <Login
          onLogin={(username) => {
            setUser(username);
            setRole(localStorage.getItem("userRole"));
          }}
        />
      )}
    </div>
  );
}

export default App;