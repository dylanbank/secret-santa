import { useEffect, useState } from 'react';
import './App.css';
import New from './pages/New';
import Draw from './pages/Draw';
function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const [ draw, setDraw]= useState();
  const [ santa, setSanta ] =useState(queryParameters.get("santa"))
  const [ gifted, setGifted ] =useState(queryParameters.get("gifted"))
  const [ address, setAddress ] =useState(queryParameters.get("address"))
  useEffect(()=>{
    if(santa&&gifted){
      setDraw(true)
    }else{
      setDraw(false)
    }
  }, [])
  
  return (
    <div className="App bg-white">
      { draw ?
        <Draw santa={santa} gifted={gifted} address={address}/>
        : 
        <New />
      }
    </div>
  );
}

export default App;
