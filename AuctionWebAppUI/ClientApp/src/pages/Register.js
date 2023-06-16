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
            <label id="label_name"></label>
            <input name="name" id="sName" className="texts" type="text" placeholder="Name" />
            <label id="label_surname"></label>
            <input name="surname" id="sSurname" className="texts" type="text" placeholder="Surname" />
            <label id="label_username"></label>
            <input name="username" id="sUsername" className="texts" type="text" placeholder="Username" />
            <label id="label_email"></label>
            <input name="email" id="sEmail" className="texts" type="email" placeholder="E-mail" />
            <label id="label_phone"></label>
            <input name="phoneNumber" id="sPhoneNumber" className="texts" type="text" placeholder="Phone number" />
            <label id="label_password"></label>
            <input name="password" id="sPassword" className="texts" type="password" placeholder="Password" />
            <label id="label_confirmP"></label>
            <input name="cpass" id="sCPassword" className="texts" type="password" placeholder="Confirm password" />
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
            if (validateInputs()) {
                register();
            }

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
            document.location.href = "http://localhost:3000/sign-in";
    });
}

function validateInputs() {
    const isAlpha = new RegExp(/^[a-zA-Z\s]+$/);
    const isEmail = new RegExp(/^[\S]+@[\S]+\.[a-zA-Z]{2,3}$/);
    const isStrongPassword = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,})/);

    const labelName = document.getElementById("label_name");
    const labelSurname = document.getElementById("label_surname");
    const labelUsername = document.getElementById("label_username");
    const labelEmail = document.getElementById("label_email");
    const labelPhone = document.getElementById("label_phone");
    const labelPassword = document.getElementById("label_password");
    const labelCPassword = document.getElementById("label_confirmP");

    const name = document.getElementById("sName").value;
    const surname = document.getElementById("sSurname").value;
    const username = document.getElementById("sUsername").value;
    const email = document.getElementById("sEmail").value;
    const phone = document.getElementById("sPhoneNumber").value;
    const password = document.getElementById("sPassword").value;
    const cPassword = document.getElementById("sCPassword").value;

    if (name.trim() === "" || !(isAlpha.test(name))) {
        labelName.innerHTML = "Name invalid.";
        labelName.style.display = "block";
    } else {
        labelName.innerHTML = "";
        labelName.style.display = "none";
    }
    if (surname.trim() === "" || !(isAlpha.test(surname))) {
        labelSurname.innerHTML = "Surname invalid.";
        labelSurname.style.display = "block";
    } else {
        labelSurname.innerHTML = "";
        labelSurname.style.display = "none";
    }
    if (username.trim() === "") {
        labelUsername.innerHTML = "Username invalid.";
        labelUsername.style.display = "block";
    } else {
        labelUsername.innerHTML = "";
        labelUsername.style.display = "none";
    }
    if (email.trim() === "" || !(isEmail.test(email))) {
        labelEmail.innerHTML = "Email invalid.";
        labelEmail.style.display = "block";
    } else {
        labelEmail.innerHTML = "";
        labelEmail.style.display = "none";
    }
    if (phone.trim() === "" || (isAlpha.test(phone))) {
        labelPhone.innerHTML = "Phone number invalid.";
        labelPhone.style.display = "block";
    } else {
        labelPhone.innerHTML = "";
        labelPhone.style.display = "none";
    }
    if (password.trim() === "" || !(isStrongPassword.test(password))) {
        labelPassword.innerHTML = "Password invalid.";
        labelPassword.style.display = "block";
    } else {
        labelPassword.innerHTML = "";
        labelPassword.style.display = "none";
    }
    if (cPassword !== password) {
        labelCPassword.innerHTML = "Passwords do not match.";
        labelCPassword.style.display = "block";
    } else {
        labelCPassword.innerHTML = "";
        labelCPassword.style.display = "none";
    }

    //Checks if labels are empty (no errors on validation)
    if (labelName.innerHTML.trim() === ""
        && labelSurname.innerHTML.trim() === ""
        && labelUsername.innerHTML.trim() === ""
        && labelEmail.innerHTML.trim() === ""
        && labelPhone.innerHTML.trim() === ""
        && labelPassword.innerHTML.trim() === ""
        && labelCPassword.innerHTML.trim() === "") {
        return true;
    } else {
        return false;
    }
}