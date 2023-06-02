import { Link } from 'react-router-dom';
import './LoginPage.css';
import LoginInputs from './LoginInputs';

const LoginPage = () => {
    return (
        <form method="post" id="formSignIn" className="LoginPage">
            <div className="sign-in-container">
                <div className="sign-in">
                    <div className="sign-in title">
                        <h1>Sign in</h1>
                    </div>
                    <LoginInputs />

                    <button className="loginSubmit">Sign in</button>
                    <Link to="/sign-up">Don't have an account? Sign up!</Link>
                </div>
            </div>
        </form>
    );
}
export default LoginPage;
