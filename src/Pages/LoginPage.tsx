import React from "react";
import LoginForm from "../Components/LoginPageCOmponents/LoginForm";
import PageTemplate from "../Components/Fixed/PageTemplate";

function LoginPage() {
  return (
    <>
   <div className="min-h-screen flex items-center justify-center loginform">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
    </>
  );
}

export default LoginPage;
