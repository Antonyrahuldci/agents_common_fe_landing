// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import CryptoJS from "crypto-js";
// import { jwtDecode } from "jwt-decode";

// const isTokenExpired = () => {
//   const token = localStorage.getItem("access-token");

//   if (!token) return true;

//   // ✅ Decrypt the token
//   const decryptedBytes = CryptoJS.AES.decrypt(
//     token,
//     import.meta.env.VITE_ENCRYPTION_SECRET
//   );
//   const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

//   if (!decryptedToken) {
//     throw new Error("Decryption failed - possibly wrong secret key");
//   }

//   try {
//     const decoded = jwtDecode(decryptedToken);
//     return decoded.exp * 1000 < Date.now();
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return true;
//   }
// };

// const ProtectedRoute = () => {
//   const isAuthenticated = !isTokenExpired();

//   if (!isAuthenticated) {
//     window.location.href = "https://jessica.simbli.ai/";
//     return null;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const isTokenExpired = () => {
//   const token = localStorage.getItem("access-token");
//   if (!token) return true;

//   try {
//     const decoded = jwtDecode(token);
//     return decoded.exp * 1000 < Date.now();
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return true;
//   }
// };

// const ProtectedRoute = () => {
//   const isAuthenticated = !isTokenExpired();

//   if (!isAuthenticated) {
//     window.location.href = "http://localhost:5173/";
//     return null;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access-token");

      if (!token || isTokenExpired(token)) {
        setIsAuthenticated(false);
        navigate("/login"); // redirect to login if invalid
        return;
      }

      try {
        // ✅ Call backend for final validation
        await axios.get("https://backend-demo.simbli.ai/api/v1/check-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.log("clearrrrr protected.jsx");

        localStorage.removeItem("access-token");
        localStorage.removeItem("mail");
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null)
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#1e1e1e", height: "100vh" }}
      >
        <div className="loadertwo"></div>
      </div>
    );

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
