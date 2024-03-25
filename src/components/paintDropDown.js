import React, { useState } from 'react'; 
 
function PaintDropdwon(props) { 
  const [selectedValue, setSelectedValue] = useState(''); 
 
  const options = [ 
    { value: 'Please select a color...', label: 'Please select a color...' },
    { value: 'blue', label: 'blue' }, 
    { value: 'grey', label: 'grey' }, 
    { value: 'black', label: 'black' }, 
    { value: 'white', label: 'white' }, 
    { value: 'purple', label: 'purple' }, 
  ]; 
 
  function handleOnChange (e) {
    setSelectedValue(e.target.value)
    props.setColor(e.target.value)
  }
 
  return ( 
    <select 
      value={selectedValue} 
      onChange= {handleOnChange} > 
      {options.map(option => ( 
        <option key={option.value} value={option.value}> 
          {option.label} 
        </option> 
      ))} 
    </select> 
  ); 
} 


export default PaintDropdwon; 