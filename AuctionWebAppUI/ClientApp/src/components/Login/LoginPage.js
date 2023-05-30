import { Link } from 'react-router-dom';


const LoginPage = () => {
    return (
        <form action="" method="post" id="formSignIn" className="LoginForm">
            <div className="login-container">
                <div className="login">

                    <Link to="/sign-up">Don't have an account? Sign up!</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginPage;
