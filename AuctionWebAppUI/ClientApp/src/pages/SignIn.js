import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/SignIn.css';

const LoginTitle = () => {
    return (
        <div className="login-title">
            <h1>Sign in</h1>
            <h5>Sign in and start browsing the latest auctions!</h5>
        </div>
    );
}

const LoginInputs = () => {
    return (
        <div className="input-div">
            <input name="email" id="SIemail" className="texts" type="email" placeholder="E-mail" />
            <label id="labelSIEmail"></label>
            <input name="password" id="SIpassword" className="texts" type="password" placeholder="Password" />
            <label id="labelSIPassword"></label>

            <div className="remember-me">
                <div className="check">
                    <input type="checkbox" /><p>Remember me</p>
                </div>
                <button disabled id="link-btn2">Forgot your password?</button>
            </div>

            <button id="btnSignin" className="loginSubmit">Sign in</button>
        </div>
    );
};

const LoginForm = () => {
    return (
        <form method="post" id="formSignIn" className="LoginForm">
            <div className="sign-in-container">
                <div className="sign-in">

                    <LoginTitle />
                    <LoginInputs />

                    <Link to="/register">Don't have an account? Register now!</Link>
                </div>
            </div>
        </form>
    );
};

const SignIn = () => {
    useEffect(() => {
        document.getElementById("btnSignin").addEventListener("click", (e) => {
            e.preventDefault();
            signin();

        });
    });

    return (
        <>
            <LoginForm />
        </>
    );
};

export default SignIn;

async function signin() {
    var data = new FormData(document.getElementById("formSignIn"));
    await fetch("http://localhost:8020/api/Authenticate/login", {
        method: "POST",
        body: data
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else
            console.log("no");
    }).then(json => {
        console.log(JSON.stringify(json));
        localStorage.setItem('roles', json.roles);
        localStorage.setItem('userId', json.userId);
        localStorage.setItem('user', json.user);
        localStorage.setItem('token', json.token);
        document.location.href = "http://localhost:3000/home";
    });
}