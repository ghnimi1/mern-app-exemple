import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Container } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute component={<HomePage />} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </>
  );
}
