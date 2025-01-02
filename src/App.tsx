import { useEffect, useState } from 'react';
import './App.css';
import New from './pages/New';
import Draw from './pages/Draw';
function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const [ draw, setDraw]= useState<boolean>(false);
  const santa = queryParameters.get("santa") || "";
  const gifted = queryParameters.get("gifted") || "";
  const address = queryParameters.get("address") || "";
  const ideas = queryParameters.get("ideas") || "";
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
        <Draw santa={santa} gifted={gifted} address={address} ideas={ideas} />
        : 
        <New />
      }
    </div>
  );
}

export default App;
