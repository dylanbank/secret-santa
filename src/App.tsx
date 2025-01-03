import { useEffect, useState } from 'react';
import './App.css';
import New from './pages/New';
import Draw from './pages/Draw';
function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const [ draw, setDraw]= useState<boolean>(false);
  const budget : string = queryParameters.get("budget") || "";
  const santa : string = queryParameters.get("santa") || "";
  const gifted : string= queryParameters.get("gifted") || "";
  const address : string = queryParameters.get("address") || "";
  const ideas : string = queryParameters.get("ideas") || "";
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
        <Draw budget={budget} santa={santa} gifted={gifted} address={address} ideas={ideas} />
        : 
        <New />
      }
    </div>
  );
}

export default App;
