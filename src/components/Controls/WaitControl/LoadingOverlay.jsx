import React from "react";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const LoadingOverlay = () => {
    const { isLoading, message } = useSelector((state) => state.loading);

    return (
        <Backdrop open={isLoading} style={{ zIndex: 1300, color: "#fff" }}>
            <div style={{ textAlign: "center" }}>
                <CircularProgress color="inherit" />
                <Typography variant="h6" style={{ marginTop: 10 }}>
                    {message}
                </Typography>
            </div>
        </Backdrop>
    );
};

export default LoadingOverlay;
