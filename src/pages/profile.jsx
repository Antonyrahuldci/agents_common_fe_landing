import React, { useState, useCallback, useRef, useEffect } from "react";
import "../assets/css/profile.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import soc1 from "../assets/images/youtube.png";
import soc2 from "../assets/images/twitter.png";
import soc3 from "../assets/images/insta.png";
import soc4 from "../assets/images/facebook.png";
import soc5 from "../assets/images/linkedin.png";
import soc6 from "../assets/images/gt.png";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo-simbli.png";
import jesica from "../assets/images/jessica.png";
import user from "../assets/images/user.png";
import social1 from "../assets/images/google.png";
import social2 from "../assets/images/linkedin1.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth0 } from "@auth0/auth0-react";
import { connections } from "../api/auth0Config";
import { useNavigate } from "react-router-dom";
import apiFunctions from "../api/apiFunctions";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { pageRoutes } from "../routes/pageRoutes";
import { appConstants } from "../constants/appConstants";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AOS from "aos";
import "aos/dist/aos.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const countries = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // ✅ store file
      setPreviewImage(URL.createObjectURL(selectedFile)); // preview
    }
  };

  const [selected, setSelected] = useState(countries[0]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    currentpassword: "",
    newpassword: "",
    countrycode: "",
    phonenumber: "",
  });
  const [isSignupMode, setIsSignupMode] = useState(false); // 🔹 New state

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Input Name: ${name}, Value: ${value}`); // Add this
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const validateForm = () => {
    const newErrors = {};

    // Email validation (only if entered)
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Username validation (text only, only if entered)
    if (formData.username && /[^a-zA-Z\s]/.test(formData.username)) {
      newErrors.username = "Username can contain only letters and spaces";
    }

    // Phone number validation (numbers only, only if entered)
    if (formData.phonenumber && /\D/.test(formData.phonenumber)) {
      newErrors.phonenumber = "Phone number must contain only numbers";
    }

    // Show all errors in snackbar if any
    if (Object.keys(newErrors).length > 0) {
      const allErrors = Object.values(newErrors).join("\n");
      showSnackbar(allErrors, "error");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const formDataPayLoad = new FormData();
    // Profile image
    if (file) {
      formDataPayLoad.append("profileImage", file);
    }
    // Optional password update
    if (formData.currentpassword) {
      formDataPayLoad.append("currentPassword", formData.currentpassword);
    }
    if (formData.newpassword) {
      formDataPayLoad.append("newPassword", formData.newpassword);
    }

    // Optional text fields update
    formDataPayLoad.append("username", formData?.username);
    formDataPayLoad.append("country_code", formData?.countrycode);
    formDataPayLoad.append("phone_number", formData?.phonenumber);

    apiFunctions
      .updateProfile(formDataPayLoad)
      .then((res) => {
        console.log("response", res);

        if (res?.status === 200 && res?.data) {
          showSnackbar("Profile Updated successfully!", "success");
          getProfileData();
          setFormData((prev) => ({
            ...prev,
            currentpassword: "",
            newpassword: "",
          }));
          setFile(null);
        } else {
          showSnackbar("Password wrong", "error");
        }
      })
      .catch(() => {
        showSnackbar("Update failed. Please try again.", "error");
      })
      .finally(() => setIsLoading(false));
  };

  const getProfileData = () => {
    apiFunctions
      .getProfile()
      .then((res) => {
        console.log("Initial Response ~ getProfile", res);
        if (
          res?.status === 200 &&
          res?.data &&
          Object.keys(res.data).length > 0
        ) {
          const data = res?.data?.data;
          setProfileData(data);
          // setPreviewImage(appConstants?.imageUrl + data?.profileImage);
        } else {
          console.log("No data found for Blog Count.");
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
    setTimeout(() => {
      // setIsLoading(false);
    }, 1500);
    if (!isFetched.current) {
      getProfileData();
      isFetched.current = true;
    }
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
      <div className="container-fluid  px-lg-0 Login_hero overflow-hidden p-0 m-0">
        <div className="container Login_top-nv d-flex justify-content-between py-4 px-4 px-lg-0">
          <img
            src={logo}
            className="Login_logo"
            alt="logo"
            onClick={() => navigate(pageRoutes?.home)}
          />
          <div className="d-flex gap-3">
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
        <div className="my-lg-5 pt-lg-2 mt-5 pt-5">
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
        </div>
        <div
          data-aos="fade-in"
          className="container d-flex align-items-center justify-content-center p-0 mt-lg-5 mt-5"
        >
          <div className="Login_form-overlay py-4 pe-4 ps-1 col-lg-9 ">
            <div className="container">
              <form
                className="row g-3"
                onSubmit={handleUpdateProfile}
                autoComplete="off"
              >
                {/* Left: Profile Card */}
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="d-flex align-items-center gap-3">
                    <Fab
                      size="small"
                      onClick={() => window.history.back()}
                      sx={{
                        // backgroundColor: "transparent",
                        backgroundColor: "#000",
                        border: "1px solid #3bf55a",
                        boxShadow: "none",
                        color: "#3bf55a",
                        "&:hover": {
                          backgroundColor: "rgba(59, 245, 90, 0.1)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <ArrowBackIcon sx={{ fontSize: 30 }} />
                    </Fab>
                    <h4 className="mb-0" style={{ fontWeight: 600 }}>
                      <span style={{ color: "#ffffff" }}>My </span>
                      <span style={{ color: "#54c754" }}>Profile</span>
                    </h4>
                  </div>
                  <div className="jesica-img-card text-center">
                    <div className="jesica-img">
                      <img
                        src={
                          previewImage ||
                          (profileData?.profileImage
                            ? appConstants?.imageUrl + profileData.profileImage
                            : user)
                        }
                        alt="profile"
                      />

                      <div
                        className="EditIcon"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <svg
                          width="100%"
                          height="100%"
                          className="img-fluid Edit_Icon_Img"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="jesica-text mt-4">
                      <h1 className="mb-0">{profileData?.username}</h1>
                      <p className="mb-0">{profileData?.email}</p>
                      <p className="pt-1">
                        {profileData?.countrycode} {profileData?.phonenumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Form Fields */}
                <div className="col-lg-7 col-md-7 col-12">
                  {/* User name */}
                  <label className="Login_label">User Name </label>
                  <div className="Login_input-group-1 mt-2">
                    <span className="Login_input-icon" aria-hidden="true">
                      {/* New Email SVG */}
                      <svg
                        width="22"
                        height="19"
                        viewBox="0 0 22 19"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15C8.8299 15 6.01077 16.5306 4.21597 18.906C3.82968 19.4172 3.63653 19.6728 3.64285 20.0183C3.64773 20.2852 3.81533 20.6219 4.02534 20.7867C4.29716 21 4.67384 21 5.4272 21H18.5727C19.3261 21 19.7028 21 19.9746 20.7867C20.1846 20.6219 20.3522 20.2852 20.3571 20.0183C20.3634 19.6728 20.1703 19.4172 19.784 18.906C17.9892 16.5306 15.17 15 12 15Z"
                          stroke="currentColor"
                        />
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51469 3 7.49997 5.01472 7.49997 7.5C7.49997 9.98528 9.51469 12 12 12Z"
                          stroke="currentColor"
                        />
                      </svg>
                    </span>

                    <input
                      type="username"
                      name="username"
                      autoComplete="off"
                      value={formData?.username || ""}
                      onChange={handleInputChange}
                      className="Login_input-field"
                      placeholder="Enter The User Name"
                    />
                  </div>

                  {/* Current Password */}
                  <label className="Login_label mt-4"> Current Password</label>
                  <div className="Login_input-group-1 mt-2">
                    <span className="Login_input-icon" aria-hidden="true">
                      {/* Key icon stays the same */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </span>

                    <input
                      name="currentpassword"
                      value={formData?.currentpassword || ""}
                      onChange={handleInputChange}
                      type={showPassword ? "text" : "password"}
                      className="Login_input-field"
                      placeholder="Enter Your Password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="Login_toggle-button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        // Eye-off (you can keep your previous if you want)
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        // New Eye-close icon
                        <svg
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                        >
                          <path
                            d="M9.58665 3.09232C9.99315 3.03223 10.4123 3 10.8441 3C15.9491 3 19.299 7.50484 20.4244 9.2868C20.5606 9.5025 20.6287 9.6103 20.6668 9.7767C20.6955 9.9016 20.6954 10.0987 20.6668 10.2236C20.6286 10.3899 20.5601 10.4985 20.4229 10.7156C20.123 11.1901 19.6659 11.8571 19.0602 12.5805M5.56807 4.71504C3.406 6.1817 1.9382 8.2194 1.26486 9.2853C1.12803 9.5019 1.05962 9.6102 1.02149 9.7765C0.992848 9.9014 0.992837 10.0984 1.02146 10.2234C1.05958 10.3897 1.12768 10.4975 1.26388 10.7132C2.38929 12.4952 5.73916 17 10.8441 17C12.9025 17 14.6756 16.2676 16.1325 15.2766M1.84417 1L19.8441 19M8.72285 7.87868C8.17995 8.4216 7.84417 9.1716 7.84417 10C7.84417 11.6569 9.18735 13 10.8441 13C11.6725 13 12.4225 12.6642 12.9654 12.1213"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* New Password */}
                  <label className="Login_label mt-4">New Password</label>
                  <div className="Login_input-group-1 mt-2">
                    <span className="Login_input-icon" aria-hidden="true">
                      {/* Key icon stays the same */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </span>

                    <input
                      name="newpassword"
                      value={formData?.newpassword || ""}
                      onChange={handleInputChange}
                      type={showPassword2 ? "text" : "password"}
                      className="Login_input-field"
                      placeholder="Enter Your Password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="Login_toggle-button"
                      aria-label={
                        showPassword2 ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword2((v) => !v)}
                    >
                      {showPassword2 ? (
                        // Eye-off (you can keep your previous if you want)
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        // New Eye-close icon
                        <svg
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                        >
                          <path
                            d="M9.58665 3.09232C9.99315 3.03223 10.4123 3 10.8441 3C15.9491 3 19.299 7.50484 20.4244 9.2868C20.5606 9.5025 20.6287 9.6103 20.6668 9.7767C20.6955 9.9016 20.6954 10.0987 20.6668 10.2236C20.6286 10.3899 20.5601 10.4985 20.4229 10.7156C20.123 11.1901 19.6659 11.8571 19.0602 12.5805M5.56807 4.71504C3.406 6.1817 1.9382 8.2194 1.26486 9.2853C1.12803 9.5019 1.05962 9.6102 1.02149 9.7765C0.992848 9.9014 0.992837 10.0984 1.02146 10.2234C1.05958 10.3897 1.12768 10.4975 1.26388 10.7132C2.38929 12.4952 5.73916 17 10.8441 17C12.9025 17 14.6756 16.2676 16.1325 15.2766M1.84417 1L19.8441 19M8.72285 7.87868C8.17995 8.4216 7.84417 9.1716 7.84417 10C7.84417 11.6569 9.18735 13 10.8441 13C11.6725 13 12.4225 12.6642 12.9654 12.1213"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* Country Code */}
                  <label className="Login_label mt-4">Country Code</label>
                  <div className="mt-2 ">
                    <div className="row ">
                      <div className=" Country_Code1">
                        <select
                          className=" Country_In form-select p-2 rounded Login_input-field"
                          value={formData?.countrycode || ""}
                          onChange={(e) => {
                            const country = countries.find(
                              (c) => c.code === e.target.value
                            );
                            setSelected(country);
                            setFormData((prev) => ({
                              ...prev,
                              countrycode: country.code,
                            }));
                          }}
                        >
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="Country_Code2">
                        <div className="Login_input-group-1 ">
                          <span className="Login_input-icon" aria-hidden="true">
                            {/* New Email SVG */}
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 2V3.4C15 3.96005 15 4.24008 14.891 4.45399C14.7951 4.64215 14.6422 4.79513 14.454 4.89101C14.2401 5 13.9601 5 13.4 5H10.6C10.0399 5 9.75992 5 9.54601 4.89101C9.35785 4.79513 9.20487 4.64215 9.10899 4.45399C9 4.24008 9 3.96005 9 3.4V2M8.2 22H15.8C16.9201 22 17.4802 22 17.908 21.782C18.2843 21.5903 18.5903 21.2843 18.782 20.908C19 20.4802 19 19.9201 19 18.8V5.2C19 4.07989 19 3.51984 18.782 3.09202C18.5903 2.71569 18.2843 2.40973 17.908 2.21799C17.4802 2 16.9201 2 15.8 2H8.2C7.0799 2 6.51984 2 6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202C5 3.51984 5 4.0799 5 5.2V18.8C5 19.9201 5 20.4802 5.21799 20.908C5.40973 21.2843 5.71569 21.5903 6.09202 21.782C6.51984 22 7.07989 22 8.2 22Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>

                          <input
                            type="phonenumber"
                            name="phonenumber"
                            value={formData?.phonenumber || ""}
                            onChange={handleInputChange}
                            className="Login_input-field Login_Field"
                            placeholder="Enter The Mobile Number"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="Login_submit-btn col-lg-12 mt-3">
                    <button className="Login_login-sim" type="submit">
                      {isLoading ? "Updating..." : "Update Profile"}  
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            ...(snackbarSeverity === "success" && {
              backgroundColor: "#58C958",
            }),
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;
