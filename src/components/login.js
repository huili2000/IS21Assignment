import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")

    const [passwordError, setPasswordError] = useState("")
    const [name, setName] = useState("")
    
    const navigate = useNavigate();
    
    const onButtonClick = () => {

        // Check if the user has entered both fields correctly
        if ("" === name) {
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
            if (accountExists){
                logIn()
            }else
            // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm("An account does not exist with this user name: " + name + ". Do you want to create a new account?")) {
                    logIn()
                }
        })        
  

    }

    // Call the server API to check if the user name already exists
    const checkAccountExists = (callback) => {
        fetch("https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/auth-user", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, password})
        })
        .then(r => r.json())
        .then(r => {
            //callback(r?.userExists)
           callback(r.length >= 1)
        })
        .catch ((error) => console.error(error))
    }

    // Log in a user using email and password
    const logIn = () => {
            fetch("https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/auth-user", {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },

            body: JSON.stringify({name, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('painter' === r[0].role) {
                props.setUserName(r[0].name)
                props.setPermission(r[0].permission)
                props.setRole(r[0].role)
                navigate("/stickyBoard")
            } else {
                props.setUserName(r[0].name)
                props.setPermission(r[0].permission)
                props.setRole(r[0].role)
                navigate("/userAdmin", props)
            }
        })
        .catch (error => console.error(error))
    }

    // return method
    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={name}
                placeholder="Enter your user name here"
                onChange={ev => setName(ev.target.value)}
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