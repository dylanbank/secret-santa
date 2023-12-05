import { useEffect, useState } from 'react';
import './App.css';
import New from './pages/New';
function App() {
  const [ draw, setDraw]= useState();
  
  useEffect(()=>{
    const queryParameters = new URLSearchParams(window.location.search)
    const name = queryParameters.get("name")
    const address = queryParameters.get("address")
    if(name&&address){
      setDraw(true)
    }else{
      setDraw(false)
    }
  }, [])
  
  return (
    <div className="App bg-white">
      { draw ?
        <div/>
        : 
        <New />
      }
    </div>
  );
}

export default App;
