import { Link } from 'react-router-dom';
import './LoginPage.css';
import LoginInputs from './LoginInputs';


const LoginPage = () => {
    return (

        <form action="" method="post" id="formLogin" className="LoginPage">
            <div className="login-title">
                <h1>Log in</h1>
            </div>
            <div className="login-container">
                <div className="login">

                    <Link to="/sign-up">Don't have an account? Sign up!</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginPage;
