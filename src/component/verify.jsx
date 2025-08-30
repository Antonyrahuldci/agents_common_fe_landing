import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import apiFunctions from "../api/apiFunctions";
import { pageRoutes } from "../routes/pageRoutes";
import back from "../assets/images/Simbli.jpg";

const VerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const hasCalled = useRef(false); // prevents multiple calls

  useEffect(() => {
    if (token && !hasCalled.current) {
      hasCalled.current = true;
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (token) => {
    try {
      const res = await apiFunctions.verifyEmail(token);
      console.log("resss", res);

      if (res?.status === 200) {
        Swal.fire({
          title: "Verified!",
          text: "Your email has been successfully verified.",
          icon: "success",
          confirmButtonText: "Login",
          background: "#1C1D1F",
          color: "#FFFFFF",
          confirmButtonColor: "#7DDD7D",
        }).then(() => navigate(pageRoutes?.login));
      } else {
        Swal.fire({
          title: "Verification Failed",
          text: res?.message || "Invalid or expired verification link.",
          icon: "error",
          confirmButtonText: "OK",
          background: "#1C1D1F",
          color: "#FFFFFF",
          confirmButtonColor: "#7DDD7D",
        }).then(() => navigate(pageRoutes?.login));
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1C1D1F",
        color: "#FFFFFF",
        confirmButtonColor: "#7DDD7D",
      }).then(() => navigate(pageRoutes?.login));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundImage: `url(${back})`,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <p style={{ color: "#7DDD7D", fontSize: "18px" }}>Verifying your email...</p>
      </div>
    );
  }

  return null;
};

export default VerifyPage;
