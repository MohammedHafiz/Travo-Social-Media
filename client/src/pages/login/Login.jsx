import './login.css'

export default function Login() {
    return (
        <div className = "login">
            <div className="loginWrapper">
                    <img src="/assets/icons/travoBlack.png" alt="" className="travoLogo" />
                <div className="loginLeft">
                    <h3 className="loginLogo">Hello!</h3>
                    <h3 className="loginLogo">We are Travo</h3>
                    <span className="loginDesc">
                        Explore the world with us ... 
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">

                    </div>
                </div>
            </div>
        </div>
    )
}
