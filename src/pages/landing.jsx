import React, { useState, useCallback, useRef, useEffect } from "react";
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
import jessica from "../assets/images/jessica.png";
import richard from "../assets/images/richard.png";
import sam from "../assets/images/sam.png";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../routes/pageRoutes";
import apiFunctions from "../api/apiFunctions";
import { appConstants } from "../constants/appConstants";
import Logo from "../assets/images/logo-simbli.png";
import Swal from "sweetalert2";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Land = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [agentData, setAgentData] = useState([]);
  const [isValidToken, setIsValidToken] = useState(null); // ✅ token status
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  // ----------------- Menu Handlers -----------------
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const goToProfile = () => {
    handleClose();
    navigate(pageRoutes?.profile);
  };

  const goToLogin = () => navigate(pageRoutes?.login);

  // ----------------- Agent Redirect -----------------
  // const handleClickHere = (url) => {
  //   const token = localStorage.getItem("access-token");
  //   const email = localStorage.getItem("mail");

  //   if (!token) {
  //     navigate(pageRoutes?.login);
  //     return;
  //   }

  //   const fullUrl = url.startsWith("http")
  //     ? url
  //     : `http://localhost:5174${url}`;
  //   const childUrl = `${fullUrl}?token=${encodeURIComponent(
  //     token
  //   )}&email=${encodeURIComponent(email)}`;

  //   console.log("Redirecting to:", childUrl);
  //   window.location.assign(childUrl);
  // };

  const handleClickHere = (url) => {
    const token = localStorage.getItem("access-token");
    const email = localStorage.getItem("mail");

    if (!token) {
      // navigate(pageRoutes?.login);
      navigate(pageRoutes?.login, { state: { redirectUrl: url } });
      return;
    }

    const baseUrl = url.startsWith("http")
      ? url
      : `http://localhost:5174${url}`;

    const childUrl = `${baseUrl}?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}`;

    window.location.href = childUrl; // ✅ Same tab navigation
  };

  // ----------------- Logout -----------------
  const handleLogout = () => {
    handleClose();

    Swal.fire({
      text: "Are you sure you want to log out?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      imageUrl: logo,
      // background: "#1C1D1F",
      customClass: {
        popup: "swal2-popup-custom",
        confirmButton: "swal2-confirm-custom",
        cancelButton: "swal2-cancel-custom",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        apiFunctions
          .logout()
          .then((res) => {
            if (res?.status === 200) {
              localStorage.removeItem("access-token");
              localStorage.removeItem("mail");
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
                // willClose: () => navigate("/"),
                willClose: () => {
                  setIsValidToken(false);
                  navigate("/");
                },
              });
            } else {
              Swal.fire({
                text: "Logout failed. Please try again.",
                icon: "error",
                background: "#111514",
                color: "#FFFFFF",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              text: "Logout failed. Please try again.",
              icon: "error",
              background: "#111514",
              color: "#FFFFFF",
            });
          });
      }
    });
  };

  // ----------------- Fetch Agents -----------------
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
      .catch((err) => {
        console.error("Error fetching agents:", err);
        setAgentData([]);
      });
  };

  const [profileData, setProfileData] = useState({});

  const getProfileData = () => {
    apiFunctions
      .getProfile()
      .then((res) => {
        // console.log("Initial Response ~ getProfile", res);
        if (
          res?.status === 200 &&
          res?.data &&
          Object.keys(res.data).length > 0
        ) {
          const data = res?.data?.data;
          setProfileData(data);
          // setPreviewImage(appConstants?.imageUrl + data?.profileImage);
        } else {
          // console.log("No data found for Blog Count.");
          setProfileData({});
        }
      })
      .catch((err) => {
        console.error("Error fetching Blog Count Data:", err);
        setProfileData({});
      });
  };

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      getProfileData();
      getAgentData();
      isFetched.current = true;
    }
  }, []);

  // ----------------- Verify Token Once -----------------
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setIsValidToken(false);
      return;
    }

    axios
      .get("https://backend-demo.simbli.ai/api/v1/check-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setIsValidToken(res.status === 200))
      .catch(() => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("mail");
        setIsValidToken(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // allow animation every time you scroll
      mirror: true, // trigger "out" animation when scrolling back up
    });
  }, []);

  return (
    <>
      <div className="container-fluid  px-lg-0 hero overflow-hidden p-0 m-0">
        <div
          className="container top-nv d-flex justify-content-between py-4 px-4 px-lg-0"
          id="header"
        >
          <img
            src={logo}
            className="logo"
            alt="logo"
            onClick={() => navigate(pageRoutes?.home)}
          />
          <div className="d-flex gap-3">
            {isValidToken ? (
              <>
                <Avatar
                  ref={buttonRef}
                  sx={{
                    bgcolor: "#70E970",
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                  src={
                    profileData?.profileImage
                      ? profileData.profileImage.includes(
                          "googleusercontent.com"
                        )
                        ? profileData.profileImage
                        : appConstants?.imageUrl + profileData.profileImage
                      : undefined
                  }
                >
                  {profileData?.username?.charAt(0).toUpperCase()}
                </Avatar>

                <Menu
                  sx={{ marginTop: 1 }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
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
                className="btn d-flex gap-2 justify-content-center align-items-center login-btn"
                onClick={goToLogin}
              >
                <div>
                  <svg
                    width="22"
                    height="19"
                    viewBox="0 0 22 19"
                    fill="none"
                    className="Login_svg"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15C8.8299 15 6.01077 16.5306 4.21597 18.906C3.82968 19.4172 3.63653 19.6728 3.64285 20.0183C3.64773 20.2852 3.81533 20.6219 4.02534 20.7867C4.29716 21 4.67384 21 5.4272 21H18.5727C19.3261 21 19.7028 21 19.9746 20.7867C20.1846 20.6219 20.3522 20.2852 20.3571 20.0183C20.3634 19.6728 20.1703 19.4172 19.784 18.906C17.9892 16.5306 15.17 15 12 15Z"
                    ></path>
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51469 3 7.49997 5.01472 7.49997 7.5C7.49997 9.98528 9.51469 12 12 12Z"
                    ></path>
                  </svg>
                </div>
                <p className="mb-0 login-text">Login</p>
              </button>
            )}
          </div>
        </div>

        <div className="my-lg-5 pt-lg-2 mt-5 pt-5 pb-5">
          <div className="background">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div
            className="container d-flex flex-column align-items-center p-0 mt-lg-5 mt-5 pt-lg-5"
            data-aos="fade-up"
          >
            <div
              className="fire-txt py-2 px-4 mt-lg-5 mt-4"
              data-aos="fade-up"
              data-aos-delay="100" // first animation
            >
              <img src={fire} className="fire" alt="fire" title="fire" />
              <p className="mb-0 p-0 w ms-2">Meet Your AI Agent Team</p>
            </div>

            <div className="col-lg-7 mt-2 mb-5 text-center">
              <h1
                className="w hero-txt mb-3"
                data-aos="fade-up"
                data-aos-delay="200" // second animation
              >
                Your <span className="fw-bold c1">AI-Powered</span> Productivity
                Partner!
              </h1>

              <p
                className="w2 p text-center mb-0 px-lg-5 px-2 pt-2"
                data-aos="fade-up"
                data-aos-delay="400" // third animation
              >
                Streamline your workflow with a dedicated team of AI agents
                designed to handle your content, educational, and secretarial
                needs.
              </p>
              <div
                className="text-center mt-4 d-none d-md-block"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <button
                  className="scroll-down-btn mt-5"
                  onClick={() =>
                    document
                      .getElementById("three-agents-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  ↓ Scroll Down
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="three-agents-overlay mt-md-5 pt-md-5 container px-lg-5 mx-lg-5"
          id="three-agents-section"
        >
          <div className=" w-80">
            <div className="ai-inter-text pb-2" data-aos="fade-up">
              <h6>
                Introducing Your <span className="fw-bold c1">AI Experts</span>
              </h6>
              <p data-aos="fade-up">
                Two AI agents, each designed to help you create, learn &
                organize more efficiently.
              </p>
            </div>
            <div className="row my-lg-5 g-3 my-3">
              {agentData?.map((agent, index) => (
                <div
                  data-aos="zoom-in"
                  data-aos-delay={index * 200}
                  data-aos-duration="800"
                  className="col-lg-4 col-12"
                  key={agent.id}
                >
                  <div className="agents-cards w-100 py-4 px-lg-4">
                    <div className="agents-cards-img">
                      <Avatar
                        src={
                          agent?.agent_profile
                            ? appConstants?.imageUrl + agent?.agent_profile
                            : undefined
                        }
                        sx={{
                          // bgcolor: "#70E970",
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

              {/* <div className="col-lg-4 col-12">
                <div className="agents-cards w-100 py-4 px-lg-4">
                  <div className="agents-cards-img">
                    <img src={jessica} alt="jessica"></img>
                  </div>
                  <div className="agents-cards-txt text-center pt-3">
                    <h6>Jessica</h6>
                    <p className="">Secretary Agent</p>
                    <button
                      className="click-heres"
                      onClick={() =>
                        handleClickHere("http://localhost:5173/dashboard")
                      }
                    >
                      Click Here
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                <div className="agents-cards w-100 py-4 px-lg-4">
                  <div className="agents-cards-img">
                    <img src={richard} alt="richard"></img>
                  </div>
                  <div className="agents-cards-txt text-center pt-3">
                    <h6>Richard</h6>
                    <p className="">RolePlay Agent</p>
                    <button
                      className="click-heres"
                      onClick={() =>
                        handleClickHere("http://localhost:5173/dashboard")
                      }
                    >
                      Click Here
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                <div className="agents-cards w-100 py-4 px-lg-4">
                  <div className="agents-cards-img">
                    <img src={sam} alt="sam"></img>
                  </div>
                  <div className="agents-cards-txt text-center pt-3">
                    <h6>Sam</h6>
                    <p className="">Sales Agent</p>
                    <button
                      className="click-heres"
                      onClick={() =>
                        handleClickHere("http://localhost:5173/dashboard")
                      }
                    >
                      Click Here
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="footer container-fluid w-100 p-0 m-0 mt-5 py-lg-0 py-4">
          <div className="mx-lg-5  py-lg-5 px-lg-5">
            <div className="foots-content row">
              <div className="simbli-foots  text-center">
                <div className="simbli-logo">
                  <img
                    src={logo}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      document
                        .getElementById("header")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  ></img>
                </div>
                <div className="simbli-text ">
                  <p>
                    Human-like agents. Trained for specific roles. Built for
                    creators, teams, and learners who want to move faster with
                    AI.
                  </p>
                  <div className="d-flex gap-3 nv-icons-soc">
                    {/* Youtube */}
                    <a
                      href="https://www.youtube.com/@Simbli-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={soc1} className="nv-icon-soc" alt="social" />
                    </a>
                    {/* Twitter */}
                    <a
                      href="https://x.com/Simbli_ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={soc2} className="nv-icon-soc" alt="social" />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/simbli.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={soc3} className="nv-icon-soc" alt="social" />
                    </a>
                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/SimbliAi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={soc4} className="nv-icon-soc" alt="social" />
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/company/simbliai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={soc5} className="nv-icon-soc" alt="social" />
                    </a>

                    {/* Reddit */}
                    <a
                      href="https://www.reddit.com/user/Simbli_ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={soc6} className="nv-icon-soc" alt="social" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="year-copy container-fluid p-0 m-0 py-2">
          <div className="d-flex justify-content-between align-items-center px-3">
            {/* Left side */}
            <p className="mb-0 pb-0 text-start ">
              © 2025 Simbli. All rights reserved. Built with human-like AI.
            </p>

            {/* Right side */}
            {/* Right side */}
            <div className="d-flex gap-3">
              <a
                href="http://localhost:5173/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-0 pb-0 text-white"
                style={{ textDecoration: "none" }}
              >
                Privacy Policy
              </a>
              <a
                href="http://localhost:5173/termsandconditons"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-0 pb-0 text-white"
                style={{ textDecoration: "none" }}
              >
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Land;
