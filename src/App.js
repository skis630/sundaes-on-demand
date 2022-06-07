import { useState } from 'react';
import './App.css';

function App() {
    
  const [ buttonColor, setButtonColor ] = useState('red');
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';
  
  return (
    <div>
        <button
            style={{backgroundColor: buttonColor, color: 'white'}}
            onClick={() => setButtonColor(newButtonColor)}
          >Change to {newButtonColor}</button>
        <br />
        <input
            type="checkbox" />
    </div>
  );
}

export default App;
