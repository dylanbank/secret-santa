import { useState } from "react";
import PersonCard from "../components/personCard";
export default function New(){
    const [ remote, setRemote ] = useState(false);
    const [ persons, setPersons ] = useState([{ 
        name: '',
        ideas: '',
        address: ''
    }])
    const [ santas, setSantas ] = useState();

    const AddPerson = () => {
        setPersons(prevState => [
            ...prevState,
            {
                name: '',
                ideas: '',
                address: '',
            }
        ])
    }
    const Submit = () => {
        let final = []
        //let copy = []

        persons.map((person,index) => {
            if(remote){
                if(person.address) {
                    final.push(person);
                }
            }else{
                if(person.name) {
                    final.push(person);
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
            const matches = random.map((person, index) => {
                const nextIndex = (index + 1) % random.length;
                return{
                    santa: person.name,
                    gifted: random[nextIndex].name,
                    address: random[nextIndex].address,
                }
            })
            const randomMatches = (()=>{
                for (let i = matches.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [matches[i], matches[j]] = [matches[j], matches[i]];
                }
                return matches;
            })();
            setSantas(randomMatches);
        }else{
            alert('add at least 2 people to the list')
        }
    }
      return (
        <div className='px-8 py-32 flex flex-col items-center'>
            <h1>Secret Santa Generator</h1>
            <div className="flex items-center gap-10">
                <p>if anybody partaking in secret santa will not be local when gift opening happens, check this box.</p>
                <input type="checkbox" onChange={()=>{setRemote(!remote)}}/>
            </div>
            <div className='w-full md:w-1/2 mt-10'>
                <div className='flex justify-between items-center bg-red p-5 rounded-t-lg'>
                    <h2 className="text-white">participants </h2>
                    <div className='h-10 w-10 bg-gift-icon bg-cover bg-no-repeat' />
                    
                </div>
                <div className='rounded-b-lg border-2 border-red'>
                    {
                    persons.map((person, index) => 
                        <PersonCard persons={persons} setPersons={setPersons} index={index} add={AddPerson} remote={remote} key={index}/>
                    )}
                </div>
                
            </div>
            <a className='-mt-2 bg-white cursor-pointer h-4 w-6 flex justify-center items-center' onClick={AddPerson}>
                <div className='h-full w-full bg-plus-icon bg-center bg-no-repeat' />
            </a>
            <a className="cursor-pointer mt-10 px-6 py-3 bg-green rounded text-white" onClick={Submit}>generate</a>
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