import {useState} from "react";
import './style.css'
import axios from "axios";

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 8 characters</p>
    );
};

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    // const [role, setRole] = useState("role");

    const getIsFormValid = () => {
        return (
            password.value.length >= 8 &&
            userName

        );
    };

    const clearForm = () => {
        setUserName("");
        setPassword({
            value: "",
            isTouched: false,
        });

    };

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        const loginDTO = {
            login_name: userName,
            password: password.value
        }
        const url = "http://localhost:8080/users/login";
        axios.post(url, loginDTO)
            .then((response) => {
                debugger;
                console.log(response.data);
                alert(response.data.message);
            })
            .catch((error) => {
                debugger;
                console.log(error);
                alert(`Error: ${error.response.data.message}`);
            });

        clearForm();
    };

    return (
        <>
            <div className="App">
                <form className="centeredForm" onSubmit={handleSubmit}>
                    <fieldset>
                        <h2 className="centeredElement">LOGIN</h2>
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
                        <div className="Field" style={{
                            paddingBottom: "24px"
                        }}>
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


                        <button className="sendData centeredElement" type="submit" disabled={!getIsFormValid()}>
                            Login
                        </button>
                    </fieldset>
                </form>
            </div>
        </>
    );

}