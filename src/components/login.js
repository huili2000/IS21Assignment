import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")

    const [passwordError, setPasswordError] = useState("")
    const [userName, setUserName] = useState("")
    
    const navigate = useNavigate();
    
    /**
    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        // Check if email has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")) {
                    logIn()
                }
        })        
  

    }*/

    const onButtonClick = () => {

        // Check if the user has entered both fields correctly
        if ("" === userName) {
            setEmailError("Please enter your user name")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 3) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        // Check if  an account exist
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm("An account does not exist with this user name: " + userName + ". Do you want to create a new account?")) {
                    logIn()
                }
        })        
  

    }

    // Call the server API to check if the user name already exists
    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({userName})
        })
        .then(r => r.json())
        .then(r => {
           // callback(r?.userExists)
            callback(r.painter.length >= 1)
        })
    }

    // Log in a user using email and password
    const logIn = () => {
        fetch("http://localhost:3080/auth-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({userName, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('painter' === (r.painter)[0].role) {
                props.setUserName((r.painter)[0].name)
                props.setPermission((r.painter)[0].permission)
                props.setRole((r.painter)[0].role)
                navigate("/stickyBoard")
            } else {
                props.setUserName((r.painter)[0].name)
                props.setPermission((r.painter)[0].permission)
                props.setRole((r.painter)[0].role)
                navigate("/userAdmin", props)
            }
        })
    }

    // return method
    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={userName}
                placeholder="Enter your user name here"
                onChange={ev => setUserName(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default Login