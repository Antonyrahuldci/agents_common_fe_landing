// src/pages/Auth/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("mail");
    // optional: also clear any app state, caches, etc.
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
}
