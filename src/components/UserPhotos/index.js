import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const { userId } = useParams();
    console.log(userId);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`http://localhost:8080/photos/photosOfUser/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setPhotos(data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
    }, [userId]);

    return (
        <>
            {photos.map((item) => (
                <div className="photo" key={item._id}>
                    <div className="content">
                        <i>{item.date_time}</i>
                        <div className="image">
                            <img src={'../../../public/images/' + item.file_name} alt="hehe"/>
                        </div>
                    </div>
                    <div className="comments">
                        {item.comments ? <h2>Comment:</h2> : <div></div>}
                        {item.comments ? (
                            item.comments.map((cmt, index) => (
                                <div key={index}>
                                    <div className="comments__header">
                                        <Link to={`/users/${cmt.user._id}`}>
                                            {cmt.user.first_name} {cmt.user.last_name}
                                        </Link>
                                        <i>{cmt.date_time}</i>
                                    </div>
                                    <p>{cmt.comment}</p>
                                </div>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

export default UserPhotos;
