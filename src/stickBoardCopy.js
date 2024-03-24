import React from "react"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

const INITIAL_LIST = [
    {
      id: '1',
      color: 'blue',
      number: 10,
    },
    {
      id: '2',
      color: 'grey',
      number: 10,
    },
    {
        id: '3',
        color: 'black',
        number: 10,
    },
    {
        id: '4',
        color: 'white',
        number: 10,
    },
    {
        id: '5',
        color: 'purple',
        number: 10,
    },
  ];

const StickyBoard = (props) => {
    const [list, setList] = useState(INITIAL_LIST);

    return (<>
    <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>{
                list.map((item, index) => (
                    <div>
                        <div key={item.id}>{item.color}</div>
                        <div key={item.id}>{item.number}</div>
                    </div>
                ))
            }</div>
        </div>
        <div>
            This is the home page.
        </div>
        

    </div>
    </>)
}

export default StickyBoard

/*
import React from 'react';
import { useState } from 'react';

export default function StickyBoard () {
    const INITIAL_LIST = [
  {
    id: '1',
    firstName: 'Robin',
    lastName: 'Wieruch',
  },
  {
    id: '2',
    firstName: 'Aiden',
    lastName: 'Kettel',
  },
  {
    id: '3',
    firstName: 'Jannet',
    lastName: 'Layn',
  },
];

const [list, setList] = useState(INITIAL_LIST);

    
  return <div> "aaaaaaaa" 
        {list.map((item, index) => (
            <div key={item.id}>
                {item.firstName} {item.lastName}
            </div>
        ))}
  </div>;
};
*/
