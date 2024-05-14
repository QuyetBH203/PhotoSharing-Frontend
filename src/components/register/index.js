import {useState} from "react";
import "./style.css";
import axios from "axios";

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 8 characters</p>
    );
};

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [occupation, setOccupation] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    // const [role, setRole] = useState("role");

    const getIsFormValid = () => {
        return (
            firstName &&
            password.value.length >= 8 &&
            userName &&
            lastName &&
            location &&
            description &&
            occupation
            // role !== "role"
        );
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setLocation("");
        setDescription("");
        setOccupation("");
        setUserName("");
        setPassword({
            value: "",
            isTouched: false,
        });
        // setRole("role");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;

        const registerDTO = {
            login_name: userName,
            password: password.value,
            first_name: firstName,
            last_name: lastName,
            location: location,
            description: description,
            occupation: occupation
        }
        const url="http://localhost:8080/users/register";
        axios.post(url, registerDTO)
            .then(response => {
                debugger;
                console.log(response.data);
                alert(response.data.message);
                clearForm();
            })
            .catch((error)=>{
                console.log(error);
                alert(`Error: ${error.response.data.message}`);

            });

        // console.log(registerDTO)
        // alert("Account created!");
        clearForm();
    };

    return (
        <>
            <div className="App">
                <form className="centeredForm" onSubmit={handleSubmit}>
                    <fieldset>
                        <h2 className="centeredElement">Register</h2>
                        <div className="Field">
                            <label>
                                First name <sup>*</sup>
                            </label>
                            <input
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                placeholder="First name"
                            />
                        </div>
                        <div className="Field">
                            <label>Last name</label>
                            <input
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                placeholder="Last name"
                            />
                        </div>
                        <div className="Field">
                            <label>
                                UserName <sup>*</sup>
                            </label>
                            <input
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                                placeholder="userName"
                            />
                        </div>
                        <div className="Field">
                            <label>
                                Password <sup>*</sup>
                            </label>
                            <input
                                value={password.value}
                                type="password"
                                onChange={(e) => {
                                    setPassword({...password, value: e.target.value});
                                }}
                                onBlur={() => {
                                    setPassword({...password, isTouched: true});
                                }}
                                placeholder="Password"
                            />
                            {password.isTouched && password.value.length < 8 ? (
                                <PasswordErrorMessage/>
                            ) : null}
                        </div>
                        <div className="Field">
                            <label>Description</label>
                            <input
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                placeholder="Description"
                            />
                        </div>
                        <div className="Field">
                            <label>Location</label>
                            <input
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                                placeholder="Location"
                            />
                        </div>
                        <div className="Field">
                            <label>Occupation</label>
                            <input
                                value={occupation}
                                onChange={(e) => {
                                    setOccupation(e.target.value);
                                }}
                                placeholder="Occupation"
                            />
                        </div>
                        <button type="submit" className="centeredElement" disabled={!getIsFormValid()}>
                            Create account
                        </button>
                    </fieldset>
                </form>
            </div>
        </>

    );
}