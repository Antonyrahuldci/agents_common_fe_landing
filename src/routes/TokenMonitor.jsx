//#region encrypted token
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CryptoJS from "crypto-js";
// import { jwtDecode } from "jwt-decode";
// import { pageRoutes } from "./pageRoutes";

// const TokenMonitor = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkTokenExpiry = () => {
//       const token = localStorage.getItem("access-token");
//       if (!token) return;
//       // ✅ Decrypt the token
//       const decryptedBytes = CryptoJS.AES.decrypt(
//         token,
//         import.meta.env.VITE_ENCRYPTION_SECRET
//       );
//       const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

//       if (!decryptedToken) {
//         throw new Error("Decryption failed - possibly wrong secret key");
//       }
//       try {
//         const decoded = jwtDecode(decryptedToken);
//         const isExpired = decoded.exp * 1000 < Date.now();
//         if (isExpired) {
//           localStorage.removeItem("access-token");
//           navigate(pageRoutes.login, { replace: true });
//         }
//       } catch (error) {
//         console.error("Invalid token. Logging out...");
//         localStorage.removeItem("access-token");
//         navigate(pageRoutes.login, { replace: true });
//       }
//     };

//     const interval = setInterval(checkTokenExpiry, 10000);

//     return () => clearInterval(interval);
//   }, [navigate]);

//   return null;
// };

// export default TokenMonitor;

//#endregion

//#region With API
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { pageRoutes } from "./pageRoutes";

// const TokenMonitor = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem("access-token");
//       if (!token) return;

//       try {
//         const decoded = jwtDecode(token);
//         const isExpired = decoded.exp * 1000 < Date.now();
//         if (isExpired) {
//           localStorage.removeItem("access-token");
//           navigate(pageRoutes.login, { replace: true });
//           return;
//         }

//         // ✅ Check with backend if token is valid (token version)
//         await axios.get("http://localhost:4000/api/v1/check-token", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } catch (error) {
//         console.error("Token invalid or error:", error);
//         localStorage.removeItem("access-token");
//         navigate("http://localhost:5174/", { replace: true });
//       }
//     };

//     const interval = setInterval(checkToken, 10000);
//     return () => clearInterval(interval);
//   }, [navigate]);

//   return null;
// };

// export default TokenMonitor;
//#endregion

//#region Working TokenMonitor.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { pageRoutes } from "./pageRoutes";

const TokenMonitor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("access-token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          console.log("Token expired. Logging out...");
          localStorage.removeItem("access-token");
          navigate(pageRoutes.login, { replace: true });
        }
      } catch (error) {
        console.error("Invalid token. Logging out...");
        localStorage.removeItem("access-token");
        navigate(pageRoutes.login, { replace: true });
      }
    };

    const interval = setInterval(checkTokenExpiry, 10000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // no UI needed
};

export default TokenMonitor;
//#endregion

// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const TokenMonitor = () => {
//   useEffect(() => {
//     const checkTokenExpiry = () => {
//       const token = localStorage.getItem("access-token");
//       if (!token) return;

//       try {
//         const decoded = jwtDecode(token);
//         const isExpired = decoded.exp * 1000 < Date.now();
//         if (isExpired) {
//           localStorage.removeItem("access-token");
//           localStorage.removeItem("mail");
//         }
//       } catch {
//         localStorage.removeItem("access-token");
//         localStorage.removeItem("mail");
//       }
//     };

//     const interval = setInterval(checkTokenExpiry, 10000); // every 10s
//     return () => clearInterval(interval);
//   }, []);

//   return null;
// };

// export default TokenMonitor;
