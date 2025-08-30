import React, { useState, useCallback, useEffect } from "react";
import "../assets/css/login.css";
import soc1 from "../assets/images/youtube.png";
import soc2 from "../assets/images/twitter.png";
import soc3 from "../assets/images/insta.png";
import soc4 from "../assets/images/facebook.png";
import soc5 from "../assets/images/linkedin.png";
import soc6 from "../assets/images/gt.png";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo-simbli.png";
import jesica from "../assets/images/jessica.png";
import social1 from "../assets/images/google.png";
import social2 from "../assets/images/linkedin1.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth0 } from "@auth0/auth0-react";
import { connections } from "../api/auth0Config";
import { useNavigate } from "react-router-dom";
import apiFunctions from "../api/apiFunctions";
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { pageRoutes } from "../routes/pageRoutes";
import AOS from "aos";
import "aos/dist/aos.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSignupMode, setIsSignupMode] = useState(false); // 🔹 New state

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase, and number";
    }

    if (Object.keys(newErrors).length > 0) {
      const allErrors = Object.values(newErrors).join("\n");
      showSnackbar(allErrors, "error");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // showSnackbar("Please fix the errors in the form", "error");
      return;
    }

    try {
      setIsLoading(true);

      const res = await apiFunctions.userLogin(formData);
      // console.log("response", res);

      if (res?.status === 200 && res?.data?.token) {
        showSnackbar("Login successfully!", "success");

        // // ✅ Decrypt the token
        // const decryptedBytes = CryptoJS.AES.decrypt(
        //   res.data.encryptedToken,
        //   import.meta.env.VITE_ENCRYPTION_SECRET
        // );
        // const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

        // if (!decryptedToken) {
        //   throw new Error("Decryption failed - possibly wrong secret key");
        // }

        // ✅ Decode the JWT
        const decodedToken = jwtDecode(res?.data?.token);
        // console.log("Decoded JWT", token);

        // ✅ Store the decrypted token in localStorage
        localStorage.setItem("access-token", res.data.token);
        localStorage.setItem("mail", decodedToken?.email || "");

        // ✅ Redirect to home page after success
        setTimeout(() => navigate(pageRoutes.home), 3000);
      } else {
        showSnackbar("Invalid email or password", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showSnackbar("Login failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // showSnackbar("Please fix the errors in the form", "error");
      return;
    }
    setIsLoading(true);

    apiFunctions
      .userRegister(formData)
      .then((res) => {
        if (res?.status === 200) {
          showSnackbar(
            "Signup successful! Please check your email for verification.",
            "success"
          );
          setIsSignupMode(false);
        } else if (res?.status === 400) {
          showSnackbar(res?.message || "Signup failed", "error");
        } else {
        }
      })
      .catch(() => {
        showSnackbar("Signup failed. Please try again.", "error");
      })
      .finally(() => setIsLoading(false));
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      // Prepare user data for backend
      const userData = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        google_id: decoded.sub,
        provider: "google",
      };

      console.log(userData, credentialResponse.credential, decoded);

      // // Send to backend for registration/storage
      // const response = await apiFunctions.registerGoogleUser(userData);

      // if (response.data.success) {
      //   // Add the new account to the list
      //   const newAccount = {
      //     email: decoded.email,
      //     status: "connected",
      //     hasIssue: false,
      //     name: decoded.name,
      //     picture: decoded.picture,
      //   };

      //   setUserAccounts((prev) => [...prev, newAccount]);
      //   setSelectedEmail(decoded.email);
      //   setShowGoogleSignup(false);

      //   // Refresh authentication status
      //   fetch(`${API}/api/me`, { credentials: "include" })
      //     .then((r) => r.json())
      //     .then(setMe)
      //     .catch(() => {});

      //   // Show success message
      //   alert("Google account connected successfully!");
      // }
    } catch (error) {
      console.error("Error registering Google user:", error);
      alert("Failed to connect Google account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    alert("Google login failed. Please try again.");
  };

  // Auth0 (LinkedIn)
  const {
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated: isAuth0Authed,
    isLoading: isAuth0Loading,
  } = useAuth0();

  const handleLinkedInLogin = async () => {
    try {
      await loginWithPopup({
        connection: connections.linkedin,
        prompt: "login",
      });

      // Get ID Token
      const claims = await getIdTokenClaims();
      console.log("ID Token:", claims.__raw);

      // Decode the token
      const decoded = jwtDecode(claims.__raw);
      console.log("Decoded Token:", decoded);
    } catch (e) {
      console.error("LinkedIn login error:", e);
      setErrors(e.message || "LinkedIn Sign-In failed.");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // allow animation every time you scroll
      mirror: true, // trigger "out" animation when scrolling back up
    });
  }, []);

  const GOOGLE_CLIENT_ID =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "805233841442-80suuco5ugfvmnh4lls683d2jaufrn77.apps.googleusercontent.com";
  return (
    <>
      <div className="container-fluid px-4 px-lg-0 Login-hero overflow-hidden">
        <div className="container Logintop-nv d-flex justify-content-between py-4 px-4 px-lg-0">
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
          className="container d-flex  align-items-center justify-content-center p-0 mt-lg-5 mt-5"
        >
          <div className="Login_form-overlay p-4 col-lg-4 ">
            <div className="row">
              {/* <div className="col-lg-6 col-12">
                <div className="jesica-img-card">
                  <div className="jesica-img">
                    <img src={jesica} alt="jesica"></img>
                  </div>
                  <div className="jesica-text text-lg-center text-left mt-3">
                    <h1 className="mb-0">Meet JESSICA:</h1>
                    <p className="pt-1">Your AI Secretary Agent</p>
                  </div>
                </div>
              </div> */}

              <div className="col-lg-12 col-12 mt-lg-0 mt-4">
                <div className="Login_form-overlay-login text-lg-left ">
                  <h6 className="Login_form-h6">
                    {isSignupMode ? "Sign Up" : "Login"}{" "}
                  </h6>
                  <p className="form-p mb-0">
                    {" "}
                    {isSignupMode
                      ? "Create your account to get started."
                      : "Welcome back! Please log in to continue."}{" "}
                  </p>
                </div>
                <form
                  className="mt-4"
                  onSubmit={
                    isSignupMode ? handleEmailRegister : handleEmailLogin
                  }
                >
                  {/* Username */}
                  {isSignupMode && (
                    <>
                      <label className="Login_label">Username</label>
                      <div className="Login_input-group-1 mt-2">
                        <span className="Login_input-icon" aria-hidden="true">
                          {/* New Username SVG */}
                          <svg
                            width="22"
                            height="19"
                            viewBox="0 0 22 19"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4.1875L9.1649 10.2601C9.8261 10.7519 10.1567 10.9978 10.5163 11.093C10.8339 11.1772 11.1661 11.1772 11.4837 11.093C11.8433 10.9978 12.1739 10.7519 12.8351 10.2601L21 4.1875M5.8 18H16.2C17.8802 18 18.7202 18 19.362 17.6526C19.9265 17.347 20.3854 16.8594 20.673 16.2596C21 15.5777 21 14.6852 21 12.9V6.1C21 4.31483 21 3.42225 20.673 2.74041C20.3854 2.14064 19.9265 1.65301 19.362 1.34742C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.34742C2.07354 1.65301 1.6146 2.14064 1.32698 2.74041C1 3.42225 1 4.31483 1 6.1V12.9C1 14.6852 1 15.5777 1.32698 16.2596C1.6146 16.8594 2.07354 17.347 2.63803 17.6526C3.27976 18 4.11984 18 5.8 18Z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>

                        <input
                          type="username"
                          name="username"
                          value={formData?.username}
                          onChange={handleInputChange}
                          className="Login_input-field"
                          placeholder="Enter User Name"
                        />
                      </div>
                    </>
                  )}
                  {/* Email */}
                  <label className="Login_label mt-2">Email</label>
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
                          d="M1 4.1875L9.1649 10.2601C9.8261 10.7519 10.1567 10.9978 10.5163 11.093C10.8339 11.1772 11.1661 11.1772 11.4837 11.093C11.8433 10.9978 12.1739 10.7519 12.8351 10.2601L21 4.1875M5.8 18H16.2C17.8802 18 18.7202 18 19.362 17.6526C19.9265 17.347 20.3854 16.8594 20.673 16.2596C21 15.5777 21 14.6852 21 12.9V6.1C21 4.31483 21 3.42225 20.673 2.74041C20.3854 2.14064 19.9265 1.65301 19.362 1.34742C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.34742C2.07354 1.65301 1.6146 2.14064 1.32698 2.74041C1 3.42225 1 4.31483 1 6.1V12.9C1 14.6852 1 15.5777 1.32698 16.2596C1.6146 16.8594 2.07354 17.347 2.63803 17.6526C3.27976 18 4.11984 18 5.8 18Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      className="Login_input-field"
                      placeholder="Enter Your Email"
                    />
                  </div>

                  {/* Password */}
                  <label className="Login_label mt-3">Password</label>
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
                      name="password"
                      value={formData?.password}
                      onChange={handleInputChange}
                      type={showPassword ? "text" : "password"}
                      className="Login_input-field"
                      placeholder="Enter Your Password"
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

                  <div className="Login_submit-btn col-lg-12 mt-4">
                    <button className="Login_login-sim" type="submit">
                      {isSignupMode ? "Sign Up" : "Sign In"}
                    </button>
                    <p
                      className="mt-2 text-center"
                      style={{
                        color: "#ffffff",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsSignupMode((prev) => !prev)}
                    >
                      {isSignupMode
                        ? "Already have an account?"
                        : "Don't have an account?"}
                      <span style={{ color: "#C0FFC0" }}>
                        {isSignupMode ? " Sign In" : " Sign Up"}
                      </span>
                    </p>
                  </div>
                </form>

                {/* or */}
                <div className="row align-items-center justify-content-center py-2">
                  <div className="col-5">
                    <hr style={{ borderColor: "#ffffff" }} />
                  </div>
                  <div className="col-auto">
                    <p className="mb-0 text-white" style={{ fontSize: "15px" }}>
                      OR
                    </p>
                  </div>
                  <div className="col-5">
                    <hr style={{ borderColor: "#ffffff" }} />
                  </div>
                </div>

                {/* social login */}
                <div className="Login_social-logins mt-2">
                  <div className="row">
                    <div className=" col-12">
                      {/* <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      >
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={handleError}
                        />
                      </GoogleOAuthProvider> */}
                      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                          // onSuccess={handleGoogleSuccess}
                          // onError={handleGoogleError}
                          useOneTap
                          theme="filled_blue"
                          size="large"
                          text="signin_with"
                          shape="rectangular"
                        />
                      </GoogleOAuthProvider>
                    </div>
                    {/* <div className="col-lg-6 col-6">
                      <button
                        className="Login_microsoft-btn "
                        onClick={handleLinkedInLogin}
                      >
                        {" "}
                        <img
                          src={social2}
                          alt="social"
                          className="Login_google-login me-1"
                        />
                        LinkedIn
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
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

export default Login;
