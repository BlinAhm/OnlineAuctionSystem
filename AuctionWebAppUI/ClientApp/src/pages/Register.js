import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Register.css';

const SignUpTitle = () => {
    return (
        <div>
            <h1>Sign up</h1>
            <h5>Register now and start bidding!</h5>
        </div>
    );
}
const SignUpInputs = () => {
    return (
        <div className="input-div2">
            <input name="name" id="sName" className="texts" type="text" placeholder="Name" />
            <input name="surname" id="sSurname" className="texts" type="text" placeholder="Surname" />
            <input name="username" id="sUsername" className="texts" type="text" placeholder="Username" />
            <input name="email" id="sEmail" className="texts" type="email" placeholder="E-mail" />
            <input name="phoneNumber" id="sPhoneNumber" className="texts" type="text" placeholder="Phone number" />
            <input name="password" id="sPassword" className="texts" type="password" placeholder="Password" />
            <input name="cpass" id="sCPassword" className="texts" type="password" placeholder="Confirm password" />
            <label id="labelCPassword"></label>
        </div>
    );
}
const SignUpForm = () => {
    return (
        <form method="post" id="form" name="form" className="SignupForm">
            <div className="sign-up-container" id="sign-up-container">
                <div className="sign-up">
                    <SignUpTitle />
                    <SignUpInputs />

                    <div className="checkSignUp">
                        <input type="checkbox" />
                        <p>I accept the <span>
                            <button disabled id="link-btn2">Terms and Conditions</button>
                        </span></p>
                    </div>

                    <button id="btnSignin" name="btnSubmit" className="signupSubmit">Sign up</button>

                    <Link to="/sign-in" className="sign-in__already">Already have an account? Sign in!</Link>
                </div>
            </div>
        </form>
    );
}
const Register = () => {
    if (localStorage.getItem("user") !== null) {
        document.location.href = "http://localhost:3000/home";
    }

    useEffect(() => {
        document.getElementById("btnSignin").addEventListener("click", (e) => {
            e.preventDefault();
            register();

        });
    });

    return (
        <>
            <SignUpForm />
        </>
    );
};

export default Register;

async function register() {
    var data = new FormData(document.getElementById("form"));
    await fetch("http://localhost:8020/api/Authenticate/register", {
        method: "POST",
        body: data
    }).then(function (response) {
        if (response.ok)
            document.location.href = "http://localhost:3000/home";
    });
}