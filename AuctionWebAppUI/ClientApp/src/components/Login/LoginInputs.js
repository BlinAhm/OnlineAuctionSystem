import { useEffect } from 'react';
import $ from 'jquery';
import './LoginInputs.css';

const LoginInputs = () => {
    useEffect(() => {
        $('.loginSubmit').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            ValidateInputs();
        });
    });

    return (
        <div className="input-div">
            <input name="Email" id="SIemail" className="texts" type="email" placeholder="E-mail" />
            <label id="labelSIEmail"></label>
            <input name="Password" id="SIpassword" className="texts" type="password" placeholder="Password" />
            <label id="labelSIPassword"></label>

            <div className="remember-me">
                <div className="check">
                    <input type="checkbox" /><p>Remember me</p>
                </div>
                <button disabled id="link-btn2">Forgot your password?</button>
            </div>

            <button className="loginSubmit">Login</button>
        </div>
    );
}

function LogIn() {
    var values = $('#formLogin').serialize();
    $.ajax({
        method: 'POST',
        url: 'http://localhost:44405/signin',
        data: values,
        success: function (data) {
            localStorage.setItem('user', data.user);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('login', data.admin);
            localStorage.setItem('token', data.token);
            window.location.href = "";
        },
        error: function (error) {
            var json = JSON.parse(error.responseText);
            var message = json.message;

            $('#labelEmail').html(message);
        }
    });
}

export default LoginInputs;
