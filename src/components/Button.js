import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({ children, onClick, loading, className, href }) => {
  // Determine if the button should act as a link or a button
  const isLink = href !== undefined;

  return (
    <Button
      onClick={isLink ? undefined : onClick} // Only set onClick if not a link
      component={isLink ? "a" : "button"} // Render as an anchor tag if href is provided
      href={isLink ? href : undefined} // Set href if it's a link
      className={`bg-[#FF2210] text-white font-semibold rounded-full transition duration-300 hover:bg-opacity-80 w-full md:w-fit ${className}`}
      disabled={loading} // Disable button when loading
      variant="contained" // Use Material-UI's contained variant
      sx={{
        padding: "12px 24px", // Custom padding
        backgroundColor: "#FF2210 ", // Corrected property name
        borderRadius: "15px",

        fontWeight: "700",
        "&:hover": {
          backgroundColor: "#FF2210", // Hover effect
        },
      }}>
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default CustomButton;
