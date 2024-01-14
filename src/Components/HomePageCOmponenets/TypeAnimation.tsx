import React from "react";
import Typed from "react-typed";

// Component to render the Typed animation
export const TypeAnimation: React.FC = () => {
  const typedStyles: React.CSSProperties = {
    color: "white", // Set font color to white
    fontSize: "32px", // Set font size to 24 pixels
  };
  return (
    <Typed
      strings={["Welcome to Amit's Broker ", "We are happy to help you..!!!"]}
      typeSpeed={50}
      backSpeed={25}
      backDelay={1000}
      loop
      style={typedStyles}
    />
  );
};
