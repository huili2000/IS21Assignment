import React from "react"
import { useState , useEffect} from 'react';
import { useTable } from 'react-table'
import Modal from 'react-modal';


import './swimLanes.css';
import './users.css';
 
const UserAdmin = (props) => {
    const [refresh, setRefresh] = useState(0);

    const [users, setUsers] = useState([])
    const [password, setPassword] = useState([])
    const [permission, setPermission] = useState([])
    const [userName, setUserName] = useState("")

    //call back end for Users
    useEffect(() => {
        fetch("http://localhost:3080/users", {
            method: "GET",
            headers: {
            'Content-Type': 'application/json'
          },
        //body: JSON.stringify({email, password})
    })
    .then(r => r.json())
    .then(r => {
        if ('success' === r.message) {
            //setInventory (r)
            //localStorage.setItem("inventory", JSON.stringify({takeAwayNumber, token: r.token}))
            //props.setLoggedIn(true)
            //props.setEmail(email)
            //navigate("/")
        } else {
            setUsers(r.users)
            //window.alert(JSON.stringify(localStorage.getItem("users")))
        }
    })
}, [])
    
function onButtonClickDelete (name) {
    
    fetch("http://localhost:3080/user", {
        method: "Delete",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                window.alert("delete this user successfully" + name)
            } else {
                window.alert("delete this user unsuccessfully: " + name)
            }
        })

        setRefresh(refresh + 1);
}

function onButtonClickUpdate () {

    
    fetch("http://localhost:3080/user/permission", {
        method: "Put",
        headers: {
       'Content-Type': 'application/json'
        },
        body: JSON.stringify(userName, permission)
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                window.alert("delete this user successfully" + userName)
            } else {
                window.alert("delete this user unsuccessfully: " + userName)
            }
        })
        
        setRefresh(refresh + 1);
        alert(userName + permission)
    }

return (<div className={"mainContainer"}>
            <div className="title">Users Board</div>
            <div className="App">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Permission</th>
                        <th></th>
                    </tr>
                    {users.map((item, index) => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.permission}</td>
                        <td><input
                            className={"inputButton"}
                            type="button"
                            onClick= {() => onButtonClickDelete (item.name)}
                            value={"Delete"} />
                        </td>
                </tr>
                ))}
                </table>
                <div className={"inputButton"}>
                    <input
                        type="button"
                        onClick= {() => onButtonClickUpdate ()}
                        value={"Update Permission"} />
                </div>
                
                <div className={"inputContainer"}>
                <input
                        value={userName}
                        placeholder="Enter your name"
                        onChange={ev => setUserName(ev.target.value)}
                        className={"inputBox"} />
                    <input
                        value={permission}
                        placeholder="Enter your permission to be updated"
                        onChange={ev => setPermission(ev.target.value)}
                        className={"inputBox"} />
                </div>
            </div>  
        </div>
)}

export default UserAdmin
