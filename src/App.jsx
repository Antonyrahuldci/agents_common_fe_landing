// import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "./routes/pageRoutes";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import TokenMonitor from "./routes/TokenMonitor";
import Land from "./pages/landing";
import Profile from "./pages/profile";
import Login from "./component/login";
import VerifyPage from "./component/verify";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import axios from "axios";

function App() {

  return (
    // <Router>
    //   <TokenMonitor />
    //   <Routes>
    //     <Route path="/logout" element={<Logout />} />
    //     <Route index path={pageRoutes?.home} element={<Land />} />
    //     <Route index path={pageRoutes?.login} element={<Login />} />
    //     <Route index path={pageRoutes?.verify} element={<VerifyPage />} />
    //     <Route element={<ProtectedRoute />}>
    //       <Route path={pageRoutes?.profile} element={<Profile />} />
    //     </Route>
    //   </Routes>
    // </Router>
    <>
      <TokenMonitor />
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route index path={pageRoutes?.home} element={<Land />} />
        <Route index path={pageRoutes?.login} element={<Login />} />
        <Route index path={pageRoutes?.verify} element={<VerifyPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={pageRoutes?.profile} element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
