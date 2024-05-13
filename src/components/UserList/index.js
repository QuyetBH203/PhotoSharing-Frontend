import React from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";

import "./styles.css";

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/users/list");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setUsers(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching the data.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <List component="nav">
                {users.map((item, index) => (
                    <div key={index}>
                        <ListItem
                            key={item._id}
                            button
                            component={Link}
                            to={`/users/${item._id}`}>
                            <ListItemText primary={`${item.last_name}`}/>
                        </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
        </div>
    );
}

export default UserList;
