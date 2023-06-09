import { Link } from 'react-router-dom';
import './css/Register.css';

const SignUpTitle = () => {
    return (
        <div>
            <h1>Sign up</h1>
            <h5>Sign up now and order your tickets now!</h5>
        </div>
    );
}
const SignUpInputs = () => {
    return (
        <div className="input-div2">
            <input name="name" id="sName" className="texts" type="text" placeholder="Name" />
            <label id="labelName"></label>
            <input name="lastName" id="sLName" className="texts" type="text" placeholder="Last name" />
            <label id="labelLName"></label>
            <input name="email" id="sEmail" className="texts" type="email" placeholder="E-mail" />
            <label id="labelEmail"></label>
            <input name="password" id="sPassword" className="texts" type="password" placeholder="Password" />
            <label id="labelPassword"></label>
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

                    <button name="btnSubmit" className="signupSubmit">Sign up</button>

                    <Link to="/log-in" className="sign-in__already">Already have an account? Sign in!</Link>
                </div>
            </div>
        </form>
    );
}
const Register = () => {
    return (
        <>
            <SignUpForm/>
        </>
    );
};

export default Register;