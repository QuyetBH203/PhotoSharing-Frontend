import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

function UserDetail() {
    const uid = useParams().userId;

    const [user, setUser] = useState(null); // Thay đổi từ mảng rỗng sang null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                debugger;
                const response = await fetch(
                    `http://localhost:8080/users/${uid}`,
                );
                // console.log(`http://localhost:8081/api/user/${uid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                // console.log(result);
                setUser(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching the data.");
                setLoading(false);
            }
        };
        fetchData();
    }, [uid]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <>
            <h2>Name: {`${user.last_name}`}</h2>
            <p>Location: {user.location}</p>
            <p>Description: {user.description}</p>
            <p>Occupation: {user.occupation}</p>
            <Button component={Link} to={`/photos/${user._id}`}>
                View Photos
            </Button>
        </>
    );
}

export default UserDetail;