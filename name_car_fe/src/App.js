import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Header from "./components/Header/Header";
import MainBody from "./components/MainBody/MainBody";
import LoginForm from "./components/ComponentItems/Form/LogInForm";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./components/ComponentItems/HomeScreen/HomeScreen";
import MainCardScreen from "./components/ComponentItems/Card/MainCardScreen";
import BeginingScreen from "./components/ComponentItems/HomeScreen/BeginingScreen";
import SignUp from "./components/ComponentItems/Form/SignUp";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [userAuth, setUserAuth] = useState();

  const handleLogin = (authStatus) => {
    setUserAuth(authStatus);
  };

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ backgroundColor: "#294F6D", width: "100vw" }}>
          <Header userAuth={userAuth} />
          <MainBody>
            <Routes>
              <Route
                path="/"
                element={<BeginingScreen onLogout={handleLogin} />}
              />
              <Route path="/home" element={<HomeScreen />} />
              <Route
                exact
                path="/login"
                element={<LoginForm onLogin={handleLogin} />}
              />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/cards" element={<MainCardScreen />} />
            </Routes>
          </MainBody>
          <Footer />
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
