import './LoginInputs.css';

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
        </div>
    );
}

export default LoginInputs;