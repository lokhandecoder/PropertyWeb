import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageRoute from "./RoutingPages/PageRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <PageRoute />
      <ToastContainer />
    </>
  );
}

export default App;
