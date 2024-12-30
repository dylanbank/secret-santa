import { useState } from "react";
import PersonCard from "../components/personCard";

export interface Person{
    name: string;
    address: string;
    giftIdea: string;
}

export interface Persons{
    persons: Person[];
}

interface Santa{
    santa: string;
    gifted: string;
    address: string;
}
export default function New(){
    const [ remote, setRemote ] = useState<boolean>(false);
    const [ giftIdeas, setGiftIdeas ] =useState<boolean>(false);
    const [ budget, setBudget ] = useState<string>('');
    const [ errorMsg, setErrorMsg ] = useState<string>('');
    const [ persons, setPersons ] = useState<Array<Person>>([{ 
        name: '',
        address: '',
        giftIdea: ''
    }])
    const [ santas, setSantas ] = useState<Array<Santa>>();

    const AddPerson = () => {
        setPersons(prevState => [
            ...prevState,
            {
                name: '',
                address: '',
                giftIdea: ''
            }
        ])
    }
    const Submit = () => {
        let final : Person[] = [];
        let errorMsg: string = '';
        let addressLess : string[] = [];
        let nameLess : string[] = [];
        
        //adds the person to the gen list if they have a name and address (address required for online opening)
        persons.map((person,index) => {
            if(remote){
                if(person.address) {
                    final.push(person);
                }else{
                    addressLess.push(person.name);
                }
            }else{
                if(person.name) {
                    final.push(person);
                }else{
                    nameLess.push(person.address);
                }
            }
        });

        if(final.length>1){
            const random = (()=>{
                for (let i = final.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [final[i], final[j]] = [final[j], final[i]];
                }
                return final;
            })();
            const matches : Santa[] = random.map((person, index) => {
                const nextIndex = (index + 1) % random.length;
                return{
                    santa: person.name,
                    gifted: random[nextIndex].name,
                    address: random[nextIndex].address,
                }
            })
            const randomMatches : Santa[] = (()=>{
                for (let i = matches.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [matches[i], matches[j]] = [matches[j], matches[i]];
                }
                return matches;
            })();
            
            if(addressLess.length || nameLess.length){
                if(addressLess.length){
                    let addrLessMsg : string = '';
                    for(let i = 0; i < addressLess.length; i++){
                        if(i!=addressLess.length-1){
                            addrLessMsg += addressLess[i]+', ';
                        }else{
                            addrLessMsg += ' and ' + addressLess[i];
                        }
                    }
                }
                if(nameLess.length){
                    let nameLessMsg : string = '';
                    for(let i = 0; i < nameLess.length; i++){
                        if(i!=nameLess.length-1){
                            nameLessMsg += nameLess[i]+', ';
                        }else{
                            nameLessMsg += ' and ' + nameLess[i];
                        }
                    }
                }
            }
            //setErrorMsg to name and addr msg's
            setSantas(randomMatches);
        }else{
            setErrorMsg('add at least 2 people to the list');
        }
    }
      return (
        <div className='lg:px-96 md:px-40 px-16 py-32 flex flex-col'>
            <h1>Secret Santa Generator</h1>
            <div className="shadow-2xl">
                <div className="bg-green p-5 rounded-t-lg mt-5">
                    <h2 className="text-left text-white">options</h2>
                </div>
                <div className="py-4 px-5 rounded-b-lg border-2 border-green">
                    <div className="flex items-center justify-start gap-10 pb-3">
                        <div className="relative flex">
                            <h3 className=" text-left">online opening:</h3>
                            {/*if anybody participating in secret santa will not be local when gift opening happens, check this box.*/}
                            <div className="absolute p-1 bg-gray rounded-full top-0 right-0 -mt-2 -mr-7 w-6 h-6">
                                <p className="m-0 p-0 text-xs text-center select-none">?</p>
                            </div>
                        </div>
                        <input className='shadow-inner' type="checkbox" onChange={()=>{setRemote(!remote)}}/>
                    </div>
                    <div className="flex items-center justify-start gap-5 w-full border-t border-t-lime py-3">
                        <h3>gift ideas:</h3>
                        <input className='shadow-inner' type="checkbox" onChange={()=>{setGiftIdeas(!giftIdeas)}}/>
                    </div>
                    <div className="flex items-center justify-start gap-5 w-full border-t border-t-lime pt-3">
                        <h3>budget: </h3>
                        <span className="flex gap-1">
                            <h3>$</h3>
                            <h3><input className="w-12" value={budget} placeholder="50" onChange={(e)=>{setBudget(e.target.value)}}></input></h3>
                        </span>
                    </div>
                </div> 
            </div>   
            <div className='mt-10 shadow-2xl'>
                <div className="bg-red p-5 rounded-t-lg">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-white">participants </h2>
                        <div className='h-10 w-10 bg-gift-icon bg-cover bg-no-repeat' />
                        
                    </div>
                    <a className='mt-2 bg-white cursor-pointer h-8 w-12 flex justify-center items-center rounded-lg' onClick={AddPerson}>
                        <div className='h-full w-full bg-plus-icon bg-center bg-no-repeat' />
                    </a>
                </div>
                <div className='rounded-b-lg border-2 border-red'>
                    {
                    persons.map((person, index) => 
                        <PersonCard persons={persons} setPersons={setPersons} index={index} add={AddPerson} remote={remote} giftIdeas={giftIdeas} key={index}/>
                    )}
                </div>
                
            </div>
            <a className="cursor-pointer mt-10 px-6 py-3 bg-green rounded text-white w-32" onClick={Submit}>generate</a>
            {santas &&
                <div className="w-full md:w-1/2 mt-10 flex flex-col items-center">
                    
                    <h2>Send To:</h2>
                    <p>{'(click to copy to clipboard)'}</p>
                    <div className="flex flex-col w-fit mt-5">
                        {
                        santas.map((santa, index) => 
                            <a title="Click to copy url" className="cursor-pointer" onClick={() => {navigator.clipboard.writeText(`${window.location.href}?santa=${santa.santa.replace(" ","+")}&gifted=${window.btoa(santa.gifted)}&address=${window.btoa(santa.address)}`)}}>{santa.santa}</a>
                        )}
                    
                    </div>
                </div>
            }
        </div>
      );
}