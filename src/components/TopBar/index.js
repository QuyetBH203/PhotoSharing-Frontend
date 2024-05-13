import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";


function TopBar() {
    const location = useLocation();
    let context = "";
    const userId = location.pathname.split("/")[2];

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setUser(result[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching the data.");
                setLoading(false);
            }
        };
         fetchData();
    }, [userId]); // Thêm userId vào dependency array để useEffect chỉ gọi lại khi userId thay đổi

    if (location.pathname.startsWith("/users")) {
        if (user) {
            context = `${user.last_name}`;
        }
    } else if (location.pathname.startsWith("/photos")) {
        if (user) {
            context = `Photos of ${user.last_name}`;
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Bui Huu Quyet
                </Typography>
                <Typography variant="h6">{context}</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
