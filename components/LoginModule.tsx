import Link from "next/link";
import { useRouter } from 'next/router';

export default function LoginModule() {


    
    return(
        <div className="loginModule">
            <form id="userLoginForm">
                <label htmlFor="userIdField">User ID: </label>
                <span className="validation">This is an example message! </span>
                <input type="text" id="userIdField" placeholder="User ID"></input>
                
                <a href="/forgotId">Forgot your UserID?</a>

                <label htmlFor="userPasswordField">Password: </label>
                <span className="validation">This is one too!</span>
                <input type="password" id="userPasswordField" placeholder="Password"></input>
                
                <a href="/resetPassword">Forgot your Password?</a>
                <div className="rememberMeField">
                <input type="checkbox" id="rememberMeCheckbox" />
                <div>Remember Me</div>
                </div>
                
                <button className="loginFormButtons" id="userLoginButton">Login</button>
                <Link className="registerButton" href="/register"><button className="loginFormButtons"id="userRegisterButton">Register</button></Link>
            </form>
        </div>
    )
}