import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo-simbli.png";
import soc1 from "../assets/images/youtube.png";
import soc2 from "../assets/images/twitter.png";
import soc3 from "../assets/images/insta.png";
import soc4 from "../assets/images/facebook.png";
import soc5 from "../assets/images/linkedin.png";
import soc6 from "../assets/images/gt.png";
import "../assets/css/land.css";
import "../assets/css/swal.css";
import fire from "../assets/images/fire.png";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../routes/pageRoutes";
import apiFunctions from "../api/apiFunctions";
import { appConstants } from "../constants/appConstants";
import Swal from "sweetalert2";

const Land = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [agentData, setAgentData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("access-token"));
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const goToProfile = () => {
    handleClose();
    navigate(pageRoutes?.profile);
  };

  const goToLogin = () => navigate(pageRoutes?.login);

  const handleClickHere = (url) => {
    const token = localStorage.getItem("access-token");
    const email = localStorage.getItem("mail");

    if (!token) {
      navigate(pageRoutes?.login);
      return;
    }

    // Ensure the URL starts with full child domain
    const fullUrl = url.startsWith("http")
      ? url
      : `http://localhost:5174${url}`;

    // Add query params
    const childUrl = `${fullUrl}?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}`;

    console.log("Redirecting to:", childUrl);

    // ✅ Use setTimeout to escape React synthetic event and ensure navigation
    setTimeout(() => {
      window.location.assign(childUrl); // Use assign instead of href for reliability
    }, 0);
  };

  // ✅ Listen for logout triggered from child or other tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logout" && event.newValue === "true") {
        localStorage.removeItem("access-token");
        localStorage.removeItem("mail");
        setToken(null);
        navigate("/"); // force to home
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  // ✅ Re-check token on page load (handles reload after child logout)
  useEffect(() => {
    setToken(localStorage.getItem("access-token"));
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    handleClose();

    Swal.fire({
      text: "Are you sure you want to log out?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
      imageUrl: logo,
      background: "#1C1D1F",
      customClass: {
        popup: "swal2-popup-custom",
        confirmButton: "swal2-confirm-custom",
        cancelButton: "swal2-cancel-custom",
        image: "logo",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Clear tokens
        localStorage.removeItem("access-token");
        localStorage.removeItem("mail");

        // ✅ Broadcast logout to child & other tabs
        localStorage.setItem("logout", "true");
        setTimeout(() => localStorage.removeItem("logout"), 100);

        Swal.fire({
          text: "Logged out successfully.",
          icon: "success",
          background: "#111514",
          color: "#FFFFFF",
          customClass: {
            popup: "swal2-popup-custom",
            confirmButton: "swal2-confirm-custom",
          },
          showConfirmButton: false,
          timer: 1000,
          willClose: () => {
            setToken(null);
            navigate("/");
          },
        });
        setTimeout(() => {
          window.location.replace("http://localhost:5174/logout");
        }, 600);
      }
    });
  };

  // ✅ Fetch agents only once
  const getAgentData = () => {
    apiFunctions
      .getagents()
      .then((res) => {
        if (
          res?.status === 200 &&
          res?.data &&
          Object.keys(res.data).length > 0
        ) {
          setAgentData(res?.data?.data);
        } else {
          setAgentData([]);
        }
      })
      .catch(() => setAgentData([]));
  };

  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      getAgentData();
      isFetched.current = true;
    }
  }, []);

  return (
    <>
      <div className="container-fluid px-lg-0 hero overflow-hidden p-0 m-0">
        <div className="container top-nv d-flex justify-content-between py-4 px-4 px-lg-0">
          <img
            src={logo}
            className="logo"
            alt="logo"
            onClick={() => navigate(pageRoutes?.home)}
          />
          <div className="d-flex gap-3">
            {token ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: "#70E970",
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                >
                  A
                </Avatar>

                <Menu
                  sx={{ marginTop: 1 }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      bgcolor: "#121318",
                      color: "#70E970",
                      borderRadius: "10px",
                      boxShadow: "none",
                    },
                  }}
                >
                  <MenuItem onClick={goToProfile} sx={{ color: "#70E970" }}>
                    <User size={18} style={{ marginRight: 8 }} /> My Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "#70E970" }}>
                    <LogOut size={18} style={{ marginRight: 8 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <button
                className="btn btn-success"
                style={{ backgroundColor: "#70E970", border: "none" }}
                onClick={goToLogin}
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="my-lg-5 pt-lg-2 mt-5 pt-5">
          <div className="background">
            {Array.from({ length: 30 }).map((_, i) => (
              <span className="dot" key={i}></span>
            ))}
          </div>

          <div className="container d-flex flex-column align-items-center p-0 mt-lg-5 mt-5 pt-lg-5">
            <div className="fire-txt py-2 px-4 animated fade-in-up delay-2 mt-lg-5 mt-4">
              <img src={fire} className="fire" alt="fire" title="fire" />
              <p className="mb-0 p-0 w ms-2">Meet Your AI Agent Team</p>
            </div>

            <div className="col-lg-7 mt-4 mb-5 text-center animated fade-in-up delay-3">
              <h1 className="w hero-txt mb-3">
                Your <span className="fw-bold c1">AI-Powered</span> Productivity
                Partner!
              </h1>
              <p className="w2 p text-center mb-0 px-lg-5 px-2 pt-2">
                Streamline your workflow with a dedicated team of AI agents
                designed to handle your content, educational, and secretarial
                needs.
              </p>
            </div>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="three-agents-overlay mt-5 pt-5 container px-lg-5 mx-lg-5">
          <div className="w-80">
            <div className="ai-inter-text">
              <h6>
                Introducing Your <span className="fw-bold c1">AI Experts</span>
              </h6>
              <p>
                Three AI agents, each designed to help you create, learn &
                organize more efficiently.
              </p>
            </div>

            <div className="row my-lg-5 my-3">
              {agentData?.map((agent) => (
                <div className="col-lg-4 col-12" key={agent.id}>
                  <div className="agents-cards w-100 py-4 px-lg-4">
                    <div className="agents-cards-img">
                      <Avatar
                        src={
                          agent?.agent_profile
                            ? appConstants?.imageUrl + agent?.agent_profile
                            : undefined
                        }
                        sx={{
                          width: 100,
                          height: 100,
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      >
                        {agent?.agent_name?.charAt(0).toUpperCase() || "A"}
                      </Avatar>
                    </div>
                    <div className="agents-cards-txt text-center pt-3">
                      <h6>{agent?.agent_name}</h6>
                      <p>{agent?.agent_type}</p>
                      <button
                        className="click-heres"
                        onClick={() =>
                          handleClickHere(agent?.agent_redirect_link)
                        }
                      >
                        Click Here
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer container-fluid w-100 p-0 m-0 mt-5 py-lg-0 py-4">
          <div className="mx-lg-5 py-lg-5 px-lg-5">
            <div className="foots-content row">
              <div className="simbli-foots text-center">
                <div className="simbli-logo">
                  <img src={logo} alt="simbli" />
                </div>
                <div className="simbli-text">
                  <p>
                    Human-like agents. Trained for specific roles. Built for
                    creators, teams, and learners who want to move faster with
                    AI.
                  </p>
                  <div className="d-flex gap-3 nv-icons-soc">
                    <img src={soc1} className="nv-icon-soc" alt="social" />
                    <img src={soc2} className="nv-icon-soc" alt="social" />
                    <img src={soc3} className="nv-icon-soc" alt="social" />
                    <img src={soc4} className="nv-icon-soc" alt="social" />
                    <img src={soc5} className="nv-icon-soc" alt="social" />
                    <img src={soc6} className="nv-icon-soc" alt="social" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Copy */}
        <div className="year-copy container-fluid p-0 m-0 py-2">
          <p className="mb-0 pb-0 text-center">
            © 2025 Simbli. All rights reserved. Built with human-like AI.
          </p>
        </div>
      </div>
    </>
  );
};

export default Land;
