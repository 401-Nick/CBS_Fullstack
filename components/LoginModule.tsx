import Link from "next/link";
import styles from "../styles/page.module.css"



const LoginModule = () => {
    return(
        <div className={styles.loginModule}>
            <form className={styles.userForm} id="userForm">
                <label htmlFor="userLoginIdField">User ID: </label>
                <span className={styles.validation}>This is an example message! </span>
                <input type="text" id="userLoginIdField" placeholder="User ID"></input>
                <a href="/forgotId">Forgot your UserID?</a>

                <label htmlFor="userLoginPasswordField">Password: </label>
                <span className={styles.validation}>This is one too!</span>
                <input type="password" id="userLoginPasswordField" placeholder="Password"></input>
                
                <a href="/resetPassword">Forgot your Password?</a>
                <div className={styles.rememberMeField}>
                <input type="checkbox" id="rememberMeCheckbox" />
                <div>Remember Me</div>
                </div>
                
                <button className={styles.loginFormButtons} id="userLoginButton">Login</button>
                <Link className={styles.registerButton} href="/register"><button className={styles.loginFormButtons} id="userRegisterButton">Register</button></Link>
            </form>
        </div>
    )
}
export default LoginModule;