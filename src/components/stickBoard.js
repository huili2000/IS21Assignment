import React from "react"
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from 'react';
import INITIAL_LIST from './initial_list'
import './swimLanes.css';
import PaintDropdwon from './paintDropDown';

const inputError = 'input error'
 
const StickyBoard = (props) => {
    const [refresh, setRefresh] = useState(0);
    const [list, setList] = useState(INITIAL_LIST);
    
    const [selectVariable, setSelectVariable] = useState('');
    
    const [listAvailable, setListAvailable] = useState(INITIAL_LIST);
    const [listLow, setListLow] = useState(INITIAL_LIST);
    const [listOutOfStock, setListOutOfStock] = useState(INITIAL_LIST);

    const [takeAwayNumber, setTakeAwayNumber] = useState(0)
    const [fillInNumber, setFillInNumber] = useState(0)

    const [color, setColor] = useState();
    const [quantity, setQuantity] = useState();

   
    //call back end for stock inventory
    useEffect(() => {
        fetch("https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/paints", {
            method: "GET",
            headers: {
            'Content-Type': 'application/json'
          },
        //body: JSON.stringify({email, password})
    })
    .then(r => r.json())
    .then(r => {
        if (0 < (r.length) ){
            
           let listReceived = r.map (obj => {
                if(obj.color === 'blue') {
                    return {...obj, cssClassName: "card release-1"}
                } else if (obj.color === 'grey'){
                    return {...obj, cssClassName: "card release-2"}    
                } else if (obj.color === 'black'){
                    return {...obj, cssClassName: "card release-3"}    
                } else if (obj.color === 'white'){
                    return {...obj, cssClassName: "card release-4"}    
                } else if (obj.color === 'purple') {
                    return {...obj, cssClassName: "card release-5"}    
                } else return obj
            })
            
            let listAvailableModified = listReceived.map(obj => {
                if (obj.quantity < 30) {
                    return { ...obj, cssClassName: "card0 release-0" };
                }
                return obj;
            });

            let listLowModified = listReceived.map(obj => {
                if ((obj.quantity > 30) || (obj.quantity === 0) ) {
                    return { ...obj, cssClassName: "card0 release-0" };
                }
                return obj;
            });

            let listOutOfStockModified = listReceived.map(obj => {
                if (obj.quantity !== 0) {
                    return { ...obj, cssClassName: "card0 release-0" };
                }
                return obj;
            });
             
            setListAvailable(listAvailableModified)
            setListLow(listLowModified)
            setListOutOfStock(listOutOfStockModified)

            //setList(r.inventory)
        } else {
            setList(r)
            window.alert(JSON.stringify(localStorage.getItem("paints")))
        }
    })}, [refresh])
    
    //Click to delete or add paints 
    function onButtonClick (action) {
        if ("takeAway" === action) {
            fetch("https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/paints/consume", {
            method: "PUT",
            headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({quantity, color})
        })
        .then(r => r.json())
        .then(r => {
            if (r.message === "success") {
                console.log("delete paint stocks successfully")
                setList(INITIAL_LIST)
            } else {
                console.log("delete paint stocks unsuccessfully")
            }
            })
            .catch (error => console.error(error))
        }

        // fill in stock
        if ("fillInStock" === action) {
            fetch("https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/paints/provision", {
                method: "PUT",
                headers: {
                'Content-Type': 'application/json'
              },
                body: JSON.stringify({quantity, color})
            })
            .then(r => r.json())
            .then(r => {
                if (r.message==="success") {
                    console.log("add paint stock successfully")
                } else {
                    console.log("add paint stock unsuccessfully")
                }
            })
            .catch (error => console.error(error))
        }
        alert ("Please confirm you will update:" + " paint color: " + color)
        setSelectVariable("")
        setRefresh(refresh + 1);
    }
// for painter with view and edit roles
if (props.permission === "view and edit") {
   return (<div className={"mainContainer"}>
        <div className="title">Paint Stocks Sticky Board</div>
        <div>
            <div className="swim-lane">
                <div className="header">Available ( greater than 30)</div>
                <div className="card2" >
                    <div className="map">{
                        listAvailable.map((item, index) => (
                            <div className="column">
                            <div className={item.cssClassName}>{item.color} {item.quantity}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>                  
            <div className="swim-lane">
                <div className="header">Low (0 to 30)</div>
                <div className="card2">
                    <div className="map">{
                        listLow.map((item, index) => (
                            <div className="column">
                            <div className={item.cssClassName}>{item.color} {item.quantity}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>                
            <div className="swim-lane">
                <div className="header">Out of Stock (0) </div>
                <div className="card2">
                    <div className="map">{
                        listOutOfStock.map((item, index) => (
                            <div className="column">
                                <div className={item.cssClassName}>{item.color} {item.quantity}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>                
        </div>
        <br />
      
        <div className={"inputContainerRow"}>
             <input
                className={"inputButton"}
                type="button"
                onClick= {() => onButtonClick ('takeAway')}
                value={"Consume Paints from Stocks"} />
            
            <div className={"space"}/>
            
            <input
                value={takeAwayNumber}
                placeholder="Enter your take away here"
                onChange={ev => setQuantity(ev.target.value)}
                className={"inputBox"} />
            
            <PaintDropdwon setColor={setColor}/>
        </div>
        
        <br/>                    
        <div className={"inputContainerRow"}>
            <input
                className={"inputButton"}
                type="button"
                onClick= {() => onButtonClick ("fillInStock")}
                value={"Add Piants Into Stocks"} />

            <div className={"space"}/>
            
            <input
                value={fillInNumber}
                placeholder="Enter your fill in number"
                onChange={ev => setQuantity(ev.target.value)}
                className={"inputBox"}/>
        
            <PaintDropdwon setColor={setColor}/>

            
        
        </div>
    </div>
// for painter with view role only
)} else if (props.permission === "view") {  
    return (<div className={"mainContainer"}>
        <div className="title">Paint Stocks Sticky Board</div>
        <div>
            <div className="swim-lane">
                <div className="header">Available ( greater than 30)</div>
                <div className="card2" >
                    <div className="map">{
                        listAvailable.map((item, index) => (
                            <div className="column">
                            <div className={item.cssClassName}>{item.color} {item.quantity}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>                                
            <div className="swim-lane">
                <div className="header">Low (0 - 30) </div>
                <div className="card2">
                    <div className="map">{
                        listLow.map((item, index) => (
                            <div className="column">
                            <div className={item.cssClassName}>{item.color} {item.quantity}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>                
            <div className="swim-lane">
                <div className="header">Out of Stock (0) </div>
                <div className="card2">
                    <div className="map">{
                        listOutOfStock.map((item, index) => (
                            <div className="column">
                                <div className={item.cssClassName}>{item.color} {item.quantity}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>                
        </div>
        <br />
     
        <div className={"inputContainerRow"}>
             <input
                className={"inputButton"}
                type="button"
                onClick= {() => onButtonClick ('takeAway')}
                value={"Consume Paints"} />
            
            <div className={"space"}/>
            
            <input
                value={takeAwayNumber}
                placeholder="Enter your take away here"
                onChange={ev => setTakeAwayNumber(ev.target.value)}
                className={"inputBox"} />
            
            <PaintDropdwon setColor={setColor}/>

        </div>
    </div>
// for admin role
)} else {
    return (
        <>
            <div className={"inputContainerRow"}>
                 <input
                    className={"inputButton"}
                    type="button"
                    onClick= {() => onButtonClick ('takeAway')}
                    value={"Consume Paints"} />
            
                <div className={"space"}/>
            
                <input
                    value={takeAwayNumber}
                    placeholder="Enter your take away here"
                    onChange={ev => setTakeAwayNumber(ev.target.value)}
                    className={"inputBox"} />
            </div>
        
            <br/>                    
            <div className={"inputContainerRow"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick= {() => onButtonClick ("fillInStock")}
                    value={"Add Pain in Stocks"} />

                <div className={"space"}/>
            
                <input
                    value={fillInNumber}
                    placeholder="Enter your fill in number"
                    onChange={ev => setFillInNumber(ev.target.value)}
                    className={"inputBox"}/>
            </div>
        </>
)}

}

export default StickyBoard
