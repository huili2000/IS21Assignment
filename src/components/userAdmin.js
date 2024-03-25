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
    const [Permission, setPermission] = useState([])
    const [name, setName] = useState("")

    //call back end for Users
    useEffect(() => {
        fetch("https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/users", {
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
            setUsers(r)
            //window.alert(JSON.stringify(localStorage.getItem("users")))
        }
    })
}, [])
    
function onButtonClickDelete (name) {
    let url = "https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/users/" + name
    fetch(url, {
        method: "Delete",
        headers: {
        'Content-Type': 'application/json'
        },
        //body: JSON.stringify(name)
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

function onButtonClickUpdate (role, Permission, password) {

    let url = "https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/users/" + name
    fetch(url, {
        method: "Put",
        headers: {
       'Content-Type': 'application/json'
        },
        body: JSON.stringify(role, Permission, password)
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
        alert(name + Permission)
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
                        onClick= {() => onButtonClickUpdate ("admin", Permission, "admin")}
                        value={"Update Permission"} />
                </div>
                
                <div className={"inputContainer"}>
                <input
                        value={name}
                        placeholder="Enter your name"
                        onChange={ev => setName(ev.target.value)}
                        className={"inputBox"} />
                    <input
                        value={Permission}
                        placeholder="Enter your permission to be updated"
                        onChange={ev => setPermission(ev.target.value)}
                        className={"inputBox"} />
                </div>
            </div>  
        </div>
)}

export default UserAdmin
